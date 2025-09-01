import { envVars } from "@/app/config";
import httpStatus from "http-status-codes";
import { CustomJwtPayload } from "../jwt/types";
import { Role, UserStatus } from "@/app/constants";
import { generateToken, verifyToken } from "../jwt";
import AppError from "@/app/error-helpers/AppError";
import { IRider } from "@/app/modules/rider/interfaces/IRider";
import { Rider } from "@/app/modules/rider/rider.model";

const validateRiderForTokenRenewal = async (user: IRider) => {
  const { userStatus, isDeleted } = user;

  if (userStatus === UserStatus.BLOCKED || userStatus === UserStatus.INACTIVE) {
    throw new AppError(httpStatus.BAD_REQUEST, `Rider is ${userStatus}.`);
  }

  if (isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, `Rider is deleted.`);
  }
};

export const renewRiderAccessToken = async (refreshToken: string) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET
  ) as CustomJwtPayload;

  const rider = await Rider.findOne({ email: verifiedRefreshToken.email });

  if (!rider) {
    throw new AppError(httpStatus.BAD_REQUEST, "Rider does not exist.");
  }

  await validateRiderForTokenRenewal(rider);

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
