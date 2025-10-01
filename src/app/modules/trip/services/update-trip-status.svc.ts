import {
  allowedTransitions,
  RoleType,
  TripStatus,
  TripTypes,
  UserStatus,
} from "../../../constants";
import { Trip } from "../trip.model";
import AppError from "../../../error-helpers/AppError";
import httpStatusCodes from "http-status-codes";
import { Driver } from "../../driver/driver.model";
import { Types } from "mongoose";
import { ITrip } from "../trip.interface";
import { Rider } from "../../rider/rider.model";

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
    const msg = `Invalid status transition from ${trip.status} to ${newStatus}.`;
    throw new AppError(httpStatusCodes.BAD_REQUEST, msg);
  }

  if (trip.driverId?.toString() !== actorId) {
    const msg = `Another driver is assigned to this trip.`;
    throw new AppError(httpStatusCodes.BAD_REQUEST, msg);
  }

  const now = new Date();
  trip.status = newStatus;

  if (newStatus === TripStatus.TRIP_STARTED) {
    trip.pickedUpAt = now;
  }

  if (newStatus === TripStatus.TRIP_COMPLETED) {
    trip.completedAt = now;
    await updateDriverEarnings(trip);
    await updateRiderStatus(trip);
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

const updateDriverEarnings = async (trip: ITrip) => {
  const driver = await Driver.findById(trip.driverId);

  if (!driver) {
    const msg = "Data corrupt. Driver not found.";
    throw new AppError(httpStatusCodes.NOT_FOUND, msg);
  }

  if (!trip.fare) {
    const msg = "Data corrupt. Trip fare not found.";
    throw new AppError(httpStatusCodes.NOT_FOUND, msg);
  }

  driver.status = UserStatus.ONLINE;
  driver.earnings.totalIncome += trip.fare;
  driver.earnings.totalTrips += 1;
  await driver.save();
};

const updateRiderStatus = async (trip: ITrip) => {
  await Rider.findByIdAndUpdate(trip.riderId, {
    $set: { status: UserStatus.ONLINE },
  });
};
