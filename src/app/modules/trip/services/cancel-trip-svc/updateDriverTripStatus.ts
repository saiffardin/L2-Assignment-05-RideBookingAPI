import { type Types } from "mongoose";
import { UserStatus } from "../../../../constants";
import { Driver } from "../../../driver/driver.model";

export const updateDriverTripStatus = async (
  driverId: Types.ObjectId | null | undefined
) => {
  if (driverId) {
    await Driver.findByIdAndUpdate(driverId, {
      $set: { status: UserStatus.ONLINE },
    });
  }
};
