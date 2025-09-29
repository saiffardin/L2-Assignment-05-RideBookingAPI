import { Trip } from "../trip.model";
import { Rider } from "../../rider/rider.model";
import httpStatusCodes from "http-status-codes";
import { Role, TripStatus } from "@/app/constants";
import AppError from "@/app/error-helpers/AppError";
import { IRider } from "../../rider/interfaces/IRider";
import { LocationNameType } from "@/app/constants/enum.locations";
import { LocationServices } from "../../location/location.service";

export const requestTrip = async (
  riderId: string,
  pickup: LocationNameType,
  destination: LocationNameType
) => {
  const rider = await Rider.findById(riderId);

  if (!rider) {
    throw new AppError(httpStatusCodes.NOT_FOUND, "Rider not found.");
  }

  validateRiderTripRequest(rider);

  const fare = await LocationServices.calculateFare(pickup, destination);

  const trip = await Trip.create({
    riderId: rider._id,
    pickup,
    destination,
    fare,
    status: TripStatus.SEARCHING_DRIVER,
    history: [
      {
        status: TripStatus.SEARCHING_DRIVER,
        timestamp: new Date(),
        actorRole: Role.RIDER,
        actorId: rider._id,
      },
    ],
  });

  rider.tripStatus = TripStatus.SEARCHING_DRIVER;
  await rider.save();

  return trip;
};

const validateRiderTripRequest = (rider: IRider) => {
  const currStage = rider?.tripStatus;

  const validStages = [
    TripStatus.OFFLINE,
    TripStatus.TRIP_COMPLETED,
    TripStatus.CANCELLED,
  ];

  const canRiderRequestTrip = currStage && validStages.includes(currStage);

  if (!canRiderRequestTrip) {
    const msg = "A rider can request only one trip at a time";
    throw new AppError(httpStatusCodes.BAD_REQUEST, msg);
  }
};
