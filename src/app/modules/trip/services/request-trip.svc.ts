import { Trip } from "../trip.model";
import { Rider } from "../../rider/rider.model";
import httpStatusCodes from "http-status-codes";
import { Role, TripStatus, UserStatus } from "../../../constants";
import AppError from "../../../error-helpers/AppError";
import { IRider } from "../../rider/interfaces/IRider";
import { LocationNameType } from "../../../constants/enum.locations";
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

  rider.status = UserStatus.ON_TRIP;
  await rider.save();

  return trip;
};

const validateRiderTripRequest = (rider: IRider) => {
  if (!rider?.status || rider?.status === UserStatus.OFFLINE) {
    const msg = `Rider status invalid (${rider?.status}).`;
    throw new AppError(httpStatusCodes.BAD_REQUEST, msg);
  }

  if (rider?.status === UserStatus.ON_TRIP) {
    const msg = "A rider can request only one trip at a time.";
    throw new AppError(httpStatusCodes.BAD_REQUEST, msg);
  }
};
