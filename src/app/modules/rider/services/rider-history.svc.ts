import AppError from "@/app/error-helpers/AppError";
import httpStatusCodes from "http-status-codes";
import { Trip } from "../../trip/trip.model";

export const riderHistory = async (riderId: string) => {
  const trips = await Trip.find({ riderId }).sort({ requestedAt: -1 });

  if (!trips || trips.length === 0) {
    const msg = "No trip found for this rider.";
    throw new AppError(httpStatusCodes.NOT_FOUND, msg);
  }

  return trips;
};
