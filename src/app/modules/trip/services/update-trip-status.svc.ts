import {
  allowedTransitions,
  RoleType,
  TripStatus,
  TripTypes,
} from "@/app/constants";
import { Trip } from "../trip.model";
import AppError from "@/app/error-helpers/AppError";
import httpStatusCodes from "http-status-codes";
import { Driver } from "../../driver/driver.model";
import { Types } from "mongoose";
import { LocationServices } from "../../location/location.service";

interface Props {
  tripId: string;
  newStatus: TripTypes;
  actorRole: RoleType;
  actorId?: string;
}

export const updateTripStatus = async (values: Props) => {
  const { tripId, newStatus, actorRole, actorId } = values;

  const trip = await Trip.findById(tripId);

  if (!trip) {
    throw new AppError(httpStatusCodes.NOT_FOUND, "Trip not found.");
  }

  const allowed = allowedTransitions[trip.status] || [];

  if (!allowed.includes(newStatus)) {
    const msg = `Invalid status transition from ${trip.status} to ${newStatus}`;
    throw new AppError(httpStatusCodes.BAD_REQUEST, msg);
  }

  const now = new Date();
  trip.status = newStatus;

  if (newStatus === TripStatus.TRIP_STARTED) {
    trip.pickedUpAt = now;
  }

  if (newStatus === TripStatus.TRIP_COMPLETED) {
    trip.completedAt = now;

    if (trip.driverId) {
      const driver = await Driver.findById(trip.driverId);
      if (driver) {
        // calculate-fare should be called when we're creating the trip
        const fare =
          trip.fare ||
          (await LocationServices.calculateFare(trip.pickup, trip.destination));

        driver.earnings.totalIncome += fare;
        driver.earnings.totalTrips += 1;
        await driver.save();
      }
    }
  }

  trip.history.push({
    status: newStatus,
    timestamp: now,
    actorRole,
    actorId: actorId ? new Types.ObjectId(actorId) : undefined,
  });

  await trip.save();
  return trip;
};
