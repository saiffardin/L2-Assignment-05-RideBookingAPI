import { UserStatus } from "@/app/constants";
import { Driver } from "../driver.model";
import AppError from "@/app/error-helpers/AppError";
import httpStatusCodes from "http-status-codes";

export const setAvailability = async (
  driverId: string,
  status: UserStatus.ONLINE | UserStatus.OFFLINE
) => {
  const driver = await Driver.findByIdAndUpdate(
    driverId,
    { status },
    { new: true }
  );

  if (!driver) {
    throw new AppError(httpStatusCodes.NOT_FOUND, "Driver not found");
  }

  return driver;
};
