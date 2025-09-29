import { Types } from "mongoose";
import { Trip } from "../../trip.model";
import httpStatusCodes from "http-status-codes";
import AppError from "@/app/error-helpers/AppError";
import { Role, RoleType, TripStatus } from "@/app/constants";
import { validateCurrentTrip } from "./validateCurrentTrip";
import { validateRiderCancellation } from "./validateRiderCancellation";
import { validateDriverCancellation } from "./validateDriverCancellation";
import { updateRiderTripStatus } from "./updateRiderTripStatus";
import { updateDriverTripStatus } from "./updateDriverTripStatus";

interface Props {
  tripId: string;
  actorRole: RoleType;
  actorId?: string;
}

/**
 * Riders have a complex logic for cancellation.
 * Drivers can only cancel before trip starts.
 * Admins or super-admins can always cancel a trip from any stage.
 */
export const cancelTrip = async (values: Props) => {
  const { tripId, actorRole, actorId } = values;

  const trip = await Trip.findById(tripId);

  if (!trip) {
    throw new AppError(httpStatusCodes.NOT_FOUND, "Trip not found.");
  }

  validateCurrentTrip(trip);

  const isReqFromRider = actorRole === Role.RIDER;
  const isReqFromDriver = actorRole === Role.DRIVER;
  const isReqFromAdmins =
    actorRole === Role.ADMIN || actorRole === Role.SUPER_ADMIN;

  if (isReqFromRider) {
    validateRiderCancellation(trip, actorId);
  } else if (isReqFromDriver) {
    validateDriverCancellation(trip, actorId);
  } else if (isReqFromAdmins) {
    const msg = "Admins can not cancel a trip.";
    throw new AppError(httpStatusCodes.BAD_REQUEST, msg);
  }

  await updateRiderTripStatus(trip, actorRole);
  await updateDriverTripStatus(trip.driverId);

  if (isReqFromRider) {
    trip.status = TripStatus.CANCELLED;
    trip.cancelledAt = new Date();
  } else if (isReqFromDriver) {
    trip.status = TripStatus.SEARCHING_DRIVER;
  }

  trip.history.push({
    status: trip.status,
    timestamp: new Date(),
    actorRole,
    actorId: actorId ? new Types.ObjectId(actorId) : undefined,
  });

  await trip.save();
  return trip;
};
