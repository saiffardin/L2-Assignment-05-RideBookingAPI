import { ITrip } from "../../trip.interface";
import { Role, RoleType, TripStatus } from "@/app/constants";
import { Rider } from "@/app/modules/rider/rider.model";

export const updateRiderTripStatus = async (
  trip: ITrip,
  actorRole: RoleType
) => {
  const riderId = trip.riderId;

  if (actorRole === Role.RIDER) {
    await Rider.findByIdAndUpdate(riderId, {
      $set: { tripStatus: TripStatus.CANCELLED },
    });
  } else if (actorRole === Role.DRIVER) {
    await Rider.findByIdAndUpdate(riderId, {
      $set: { tripStatus: TripStatus.SEARCHING_DRIVER },
    });
  }
};
