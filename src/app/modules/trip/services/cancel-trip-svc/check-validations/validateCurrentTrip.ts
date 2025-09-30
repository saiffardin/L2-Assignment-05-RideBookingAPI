import { TripStatus } from "../../../../../constants";
import httpStatusCodes from "http-status-codes";
import AppError from "../../../../../error-helpers/AppError";
import { ITrip } from "../../../trip.interface";

export const validateCurrentTrip = (trip: ITrip) => {
  const invalidStages = [
    TripStatus.OFFLINE,
    TripStatus.TRIP_COMPLETED,
    TripStatus.TRIP_STARTED,
    TripStatus.CANCELLED,
  ];

  if (invalidStages.includes(trip.status)) {
    const msg = `This trip can not be cancelled. It's already in ${trip.status} stage.`;
    throw new AppError(httpStatusCodes.BAD_REQUEST, msg);
  }
};
