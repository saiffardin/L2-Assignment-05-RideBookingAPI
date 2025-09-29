import { TripStatus } from "@/app/constants";
import { ITrip } from "../../trip.interface";
import httpStatusCodes from "http-status-codes";
import AppError from "@/app/error-helpers/AppError";

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
