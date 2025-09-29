import { ITrip } from "../../../trip.interface";
import { validateCurrentTrip } from "./validateCurrentTrip";
import { validateRiderCancellation } from "./validateRiderCancellation";
import { validateDriverCancellation } from "./validateDriverCancellation";

interface Props {
  trip: ITrip;
  actorId: string | undefined;
  isReqFromRider: boolean;
  isReqFromDriver: boolean;
}

export const checkValidations = (values: Props) => {
  const { trip, actorId, isReqFromRider, isReqFromDriver } = values;

  validateCurrentTrip(trip);

  if (isReqFromRider) {
    validateRiderCancellation(trip, actorId);
  } else if (isReqFromDriver) {
    validateDriverCancellation(trip, actorId);
  }
};
