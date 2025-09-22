import { Types } from "mongoose";
import { Trip } from "../trip.model";
import { ITrip } from "../trip.interface";
import httpStatusCodes from "http-status-codes";
import AppError from "@/app/error-helpers/AppError";
import { DriverStatus, Role, RoleType, TripStatus } from "@/app/constants";
import { Rider } from "../../rider/rider.model";
import { Driver } from "../../driver/driver.model";

interface Props {
  tripId: string;
  actorRole: RoleType;
  actorId?: string;
}

const CANCEL_WINDOW_SECONDS = parseInt(
  process.env.CANCEL_WINDOW_SECONDS || "60",
  10
);

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

  if (actorRole === Role.RIDER) {
    validateRiderCancellation(trip);
  } else if (
    actorRole === Role.DRIVER &&
    trip.status !== TripStatus.DRIVER_ASSIGNED
  ) {
    const msg = "Driver can only cancel before trip starts.";
    throw new AppError(httpStatusCodes.NOT_FOUND, msg);
  }

  await updateRiderTripStatus(trip.riderId);
  await updateDriverTripStatus(trip.driverId);

  trip.status = TripStatus.CANCELLED;
  trip.cancelledAt = new Date();

  trip.history.push({
    status: TripStatus.CANCELLED,
    timestamp: new Date(),
    actorRole,
    actorId: actorId ? new Types.ObjectId(actorId) : undefined,
  });

  await trip.save();
  return trip;
};

const validateCurrentTrip = (trip: ITrip) => {
  if (
    trip.status === TripStatus.OFFLINE ||
    trip.status === TripStatus.CANCELLED
  ) {
    const msg = `This trip can not be cancelled. It's already in ${trip.status} stage.`;
    throw new AppError(httpStatusCodes.BAD_REQUEST, msg);
  }
};

const validateRiderCancellation = (trip: ITrip) => {
  switch (trip.status) {
    /** rider is allowed to cancel the trip in this stage */
    case TripStatus.SEARCHING_DRIVER: {
      break;
    }

    /**
     * A rider can cancel the trip on this stage only if
     * the cancellation occurs within the grace period.
     */
    case TripStatus.DRIVER_ASSIGNED: {
      if (!trip.acceptedAt) {
        const msg = "Trip not properly accepted.";
        throw new AppError(httpStatusCodes.CONFLICT, msg);
      }

      const diff = (Date.now() - trip.acceptedAt.getTime()) / 1000;

      if (diff > CANCEL_WINDOW_SECONDS) {
        const msg = `Cancellation window (${CANCEL_WINDOW_SECONDS} seconds) passed.`;
        throw new AppError(httpStatusCodes.BAD_REQUEST, msg);
      }

      break;
    }

    /**
     * A rider can only cancel a trip if the "trip_status" is
     * either SEARCHING_DRIVER or DRIVER_ASSIGNED
     */
    default: {
      const msg = `Rider cannot cancel at this (${trip.status}) stage.`;
      throw new AppError(httpStatusCodes.BAD_REQUEST, msg);
    }
  }
};

const updateRiderTripStatus = async (riderId: Types.ObjectId) => {
  if (riderId) {
    await Rider.findByIdAndUpdate(riderId, {
      $set: { tripStatus: TripStatus.OFFLINE },
    });
  }
};

const updateDriverTripStatus = async (
  driverId: Types.ObjectId | null | undefined
) => {
  if (driverId) {
    await Driver.findByIdAndUpdate(driverId, {
      $set: { status: DriverStatus.ONLINE },
    });
  }
};
