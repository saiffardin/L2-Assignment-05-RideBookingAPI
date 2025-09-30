import { Types } from "mongoose";
import { Trip } from "../../trip.model";
import httpStatusCodes from "http-status-codes";
import AppError from "@/app/error-helpers/AppError";
import { Role, RoleType, TripStatus } from "@/app/constants";
import { updateRiderTripStatus } from "./updateRiderTripStatus";
import { updateDriverTripStatus } from "./updateDriverTripStatus";
import { checkValidations } from "./check-validations";

interface Props {
  tripId: string;
  actorRole: RoleType;
  actorId?: string;
}

export const cancelTrip = async (values: Props) => {
  const { tripId, actorRole, actorId } = values;

  const isReqFromRider = actorRole === Role.RIDER;
  const isReqFromDriver = actorRole === Role.DRIVER;

  const trip = await Trip.findById(tripId);

  if (!trip) {
    throw new AppError(httpStatusCodes.NOT_FOUND, "Trip not found.");
  }

  checkValidations({
    trip,
    actorId,
    isReqFromRider,
    isReqFromDriver,
  });

  await updateRiderTripStatus(trip, isReqFromRider);
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
