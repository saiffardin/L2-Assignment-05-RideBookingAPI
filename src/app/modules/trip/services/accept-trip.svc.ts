import { Trip } from "../trip.model";
import httpStatusCodes from "http-status-codes";
import { Driver } from "../../driver/driver.model";
import AppError from "@/app/error-helpers/AppError";
import { UserStatus, Role, TripStatus } from "@/app/constants";

export const acceptTrip = async (tripId: string, driverId: string) => {
  const trip = await Trip.findById(tripId);

  if (!trip) {
    throw new AppError(httpStatusCodes.NOT_FOUND, "Trip not found.");
  }

  if (trip.status !== TripStatus.SEARCHING_DRIVER) {
    const msg = "Cannot accept non-requested trip.";
    throw new AppError(httpStatusCodes.BAD_REQUEST, msg);
  }

  const driver = await validateAndUpdateDriver(driverId);

  trip.driverId = driver.id;
  trip.status = TripStatus.DRIVER_ASSIGNED;
  trip.acceptedAt = new Date();

  trip.history.push({
    status: TripStatus.DRIVER_ASSIGNED,
    timestamp: new Date(),
    actorRole: Role.DRIVER,
    actorId: driver.id,
  });

  await trip.save();

  return trip;
};

const validateAndUpdateDriver = async (driverId: string) => {
  const driver = await Driver.findById(driverId);

  if (!driver) {
    throw new AppError(httpStatusCodes.NOT_FOUND, "Driver doesn't exist.");
  }

  if (driver.status === UserStatus.ON_TRIP) {
    const msg = "A driver can accept only one trip at a time.";
    throw new AppError(httpStatusCodes.BAD_REQUEST, msg);
  }

  driver.status = UserStatus.ON_TRIP;
  await driver.save();

  return driver;
};
