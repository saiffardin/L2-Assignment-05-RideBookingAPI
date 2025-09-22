import { Location } from "./location.model";
import httpStatusCodes from "http-status-codes";
import AppError from "@/app/error-helpers/AppError";
import { LocationNameType } from "@/app/constants/enum.locations";

const calculateFare = async (
  pickUp: LocationNameType,
  dest: LocationNameType
) => {
  const locArr = await Location.find({ name: pickUp });

  if (!locArr || locArr.length === 0) {
    const msg = "Pick-up location not found.";
    throw new AppError(httpStatusCodes.NOT_FOUND, msg);
  }

  const destDB = locArr?.[0]?.fares?.find((item) => item?.destination === dest);
  return destDB?.fare ?? 0;
};

export const LocationServices = {
  calculateFare,
};
