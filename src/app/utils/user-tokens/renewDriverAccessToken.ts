import { envVars } from "@/app/config";
import httpStatus from "http-status-codes";
import { CustomJwtPayload } from "../jwt/types";
import { Role, UserStatus } from "@/app/constants";
import { generateToken, verifyToken } from "../jwt";
import AppError from "@/app/error-helpers/AppError";
import { Driver } from "@/app/modules/driver/driver.model";
import { IDriver } from "@/app/modules/driver/interfaces/IDriver";

const validateDriverForTokenRenewal = async (user: IDriver) => {
  const { userStatus, isDeleted } = user;

  if (userStatus === UserStatus.BLOCKED || userStatus === UserStatus.INACTIVE) {
    throw new AppError(httpStatus.BAD_REQUEST, `Driver is ${userStatus}.`);
  }

  if (isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, `Driver is deleted.`);
  }
};

export const renewDriverAccessToken = async (refreshToken: string) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET
  ) as CustomJwtPayload;

  const driver = await Driver.findOne({ email: verifiedRefreshToken.email });

  if (!driver) {
    throw new AppError(httpStatus.BAD_REQUEST, "Driver does not exist.");
  }

  await validateDriverForTokenRenewal(driver);

  const jwtPayload = {
    userId: driver._id,
    email: driver.email,
    role: Role.DRIVER,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );

  return accessToken;
};
