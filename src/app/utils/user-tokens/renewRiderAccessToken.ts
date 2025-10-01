import { envVars } from "../../config";
import httpStatus from "http-status-codes";
import { CustomJwtPayload } from "../jwt/types";
import { Role } from "../../constants";
import { generateToken, verifyToken } from "../jwt";
import AppError from "../../error-helpers/AppError";
import { Rider } from "../../modules/rider/rider.model";

// saif :: TODO :: refresh token API
export const renewRiderAccessToken = async (refreshToken: string) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET
  ) as CustomJwtPayload;

  const rider = await Rider.findOne({ email: verifiedRefreshToken.email });

  if (!rider) {
    throw new AppError(httpStatus.BAD_REQUEST, "Rider does not exist.");
  }

  const jwtPayload = {
    userId: rider._id,
    email: rider.email,
    role: Role.RIDER,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );

  return accessToken;
};
