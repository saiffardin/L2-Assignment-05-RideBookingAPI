import { ITrip } from "../../trip.interface";
import { TripStatus } from "@/app/constants";
import httpStatusCodes from "http-status-codes";
import AppError from "@/app/error-helpers/AppError";

const CANCEL_WINDOW_SECONDS = parseInt(
  process.env.CANCEL_WINDOW_SECONDS || "60",
  10
);

export const validateRiderCancellation = (
  trip: ITrip,
  actorId: string | undefined
) => {
  if (!trip.riderId) {
    const msg = "Data corrupt. Rider ID is missing from the trip.";
    throw new AppError(httpStatusCodes.CONFLICT, msg);
  }

  if (String(trip.riderId) !== actorId) {
    const msg = "A rider cannot cancel another rider’s trip.";
    throw new AppError(httpStatusCodes.BAD_REQUEST, msg);
  }

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
        const msg = `Can't cancel a trip after ${CANCEL_WINDOW_SECONDS} seconds has passed.`;
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
