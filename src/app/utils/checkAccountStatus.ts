import { type Model } from "mongoose";
import { Role, RoleType, UserAccount, UserStatus } from "../constants";
import { Driver } from "../modules/driver/driver.model";
import { Rider } from "../modules/rider/rider.model";
import AppError from "../error-helpers/AppError";
import httpStatusCodes from "http-status-codes";

export const checkAccountStatus = async (userId: string, role: RoleType) => {
  if (role === Role.ADMIN || role === Role.SUPER_ADMIN) return; // saif :: TODO

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const model: Model<any> = role === Role.DRIVER ? Driver : Rider;

  const user = await model.findById(userId);

  if (!user) {
    const msg = `User not found in this (${role}) role.`;
    throw new AppError(httpStatusCodes.NOT_FOUND, msg);
  }

  if (user?.isDeleted) {
    const msg = `${role} is deleted.`;
    throw new AppError(httpStatusCodes.NOT_FOUND, msg);
  }

  if (user?.status === UserStatus.OFFLINE) {
    const msg = `${role} is offline.`;
    throw new AppError(httpStatusCodes.NOT_FOUND, msg);
  }

  const validArr = [
    UserAccount.ACTIVE,
    UserAccount.UNBLOCKED,
    UserAccount.APPROVED,
  ];

  const isAccountValid = validArr.includes(user?.accountStatus);

  if (!isAccountValid) {
    const msg = `${role} account is ${user?.accountStatus}`;
    throw new AppError(httpStatusCodes.FORBIDDEN, msg);
  }
};
