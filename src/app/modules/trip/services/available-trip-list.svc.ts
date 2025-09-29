import { TripStatus } from "@/app/constants";
import { Trip } from "../trip.model";
import AppError from "@/app/error-helpers/AppError";
import httpStatusCodes from "http-status-codes";

export const availableTripList = async () => {
  const trips = await Trip.find({ status: TripStatus.SEARCHING_DRIVER }).sort({
    requestedAt: 1,
  });

  if (!trips || trips.length === 0) {
    const msg = "No rider is currently looking for a driver.";
    throw new AppError(httpStatusCodes.NOT_FOUND, msg);
  }

  return trips;
};
