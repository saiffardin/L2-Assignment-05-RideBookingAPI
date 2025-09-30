import { ITrip } from "../../trip.interface";
import { UserStatus } from "../../../../constants";
import { Rider } from "../../../rider/rider.model";

export const updateRiderTripStatus = async (
  trip: ITrip,
  isReqFromRider: boolean
) => {
  const riderId = trip.riderId;

  if (isReqFromRider) {
    await Rider.findByIdAndUpdate(riderId, {
      $set: { status: UserStatus.ONLINE },
    });
  }
};
