import { Trip } from "../trip.model";
import httpStatusCodes from "http-status-codes";
import AppError from "@/app/error-helpers/AppError";
import { Role, TripStatus } from "@/app/constants";
import { Types } from "mongoose";

export const acceptTrip = async (tripId: string, driverId: string) => {
  const trip = await Trip.findById(tripId);

  if (!trip) {
    throw new AppError(httpStatusCodes.NOT_FOUND, "Trip not found.");
  }

  if (trip.status !== TripStatus.SEARCHING_DRIVER) {
    throw new AppError(
      httpStatusCodes.BAD_REQUEST,
      "Cannot accept non-requested trip."
    );
  }

  const driverIdMongo = new Types.ObjectId(driverId);

  trip.driverId = driverIdMongo;
  trip.status = TripStatus.DRIVER_ASSIGNED;
  trip.acceptedAt = new Date();

  trip.history.push({
    status: TripStatus.DRIVER_ASSIGNED,
    timestamp: new Date(),
    actorRole: Role.DRIVER,
    actorId: driverIdMongo,
  });

  await trip.save();
  return trip;
};
