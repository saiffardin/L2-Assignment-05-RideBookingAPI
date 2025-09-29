import httpStatusCodes from "http-status-codes";
import { ITrip } from "../../../trip.interface";
import AppError from "@/app/error-helpers/AppError";
import { validateCurrentTrip } from "./validateCurrentTrip";
import { validateRiderCancellation } from "./validateRiderCancellation";
import { validateDriverCancellation } from "./validateDriverCancellation";

interface Props {
  trip: ITrip;
  actorId: string | undefined;
  isReqFromRider: boolean;
  isReqFromDriver: boolean;
  isReqFromAdmins: boolean;
}

export const checkValidations = (values: Props) => {
  const { trip, actorId, isReqFromRider, isReqFromDriver, isReqFromAdmins } =
    values;

  validateCurrentTrip(trip);

  if (isReqFromRider) {
    validateRiderCancellation(trip, actorId);
  } else if (isReqFromDriver) {
    validateDriverCancellation(trip, actorId);
  } else if (isReqFromAdmins) {
    const msg = "Admins can not cancel a trip.";
    throw new AppError(httpStatusCodes.BAD_REQUEST, msg);
  }
};
