import { ITrip } from "../../../trip.interface";
import { TripStatus } from "../../../../../constants";
import httpStatusCodes from "http-status-codes";
import AppError from "../../../../../error-helpers/AppError";

export const validateDriverCancellation = (
  trip: ITrip,
  actorId: string | undefined
) => {
  if (!trip.driverId) {
    const msg = "No driver has assigned to this trip yet.";
    throw new AppError(httpStatusCodes.BAD_REQUEST, msg);
  }

  if (String(trip.driverId) !== actorId) {
    const msg = "A driver cannot cancel another driver’s trip.";
    throw new AppError(httpStatusCodes.BAD_REQUEST, msg);
  }

  if (trip.status !== TripStatus.DRIVER_ASSIGNED) {
    const msg = "Driver can only cancel before trip starts.";
    throw new AppError(httpStatusCodes.NOT_FOUND, msg);
  }
};
