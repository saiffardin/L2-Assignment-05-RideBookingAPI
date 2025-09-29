import { type Types } from "mongoose";
import { DriverStatus } from "@/app/constants";
import { Driver } from "@/app/modules/driver/driver.model";

export const updateDriverTripStatus = async (
  driverId: Types.ObjectId | null | undefined
) => {
  if (driverId) {
    await Driver.findByIdAndUpdate(driverId, {
      $set: { status: DriverStatus.ONLINE },
    });
  }
};
