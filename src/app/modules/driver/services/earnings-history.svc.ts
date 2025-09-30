import { Trip } from "../../trip/trip.model";
import { TripStatus } from "../../../constants";

export const earningsHistory = async (driverId: string) => {
  const trips = await Trip.find(
    {
      driverId,
      status: TripStatus.TRIP_COMPLETED,
    },
    {
      pickup: 1,
      destination: 1,
      fare: 1,
    }
  );

  const totalTrips = trips.length;
  const totalEarnings = trips.reduce((sum, item) => (item?.fare ?? 0) + sum, 0);

  return { totalEarnings, totalTrips, trips };
};
