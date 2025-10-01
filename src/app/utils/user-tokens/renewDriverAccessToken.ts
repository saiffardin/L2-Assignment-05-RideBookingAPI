import { envVars } from "../../config";
import httpStatus from "http-status-codes";
import { CustomJwtPayload } from "../jwt/types";
import { Role } from "../../constants";
import { generateToken, verifyToken } from "../jwt";
import AppError from "../../error-helpers/AppError";
import { Driver } from "../../modules/driver/driver.model";

// saif :: TODO :: refresh token API
export const renewDriverAccessToken = async (refreshToken: string) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET
  ) as CustomJwtPayload;

  const driver = await Driver.findOne({ email: verifiedRefreshToken.email });

  if (!driver) {
    throw new AppError(httpStatus.BAD_REQUEST, "Driver does not exist.");
  }

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
