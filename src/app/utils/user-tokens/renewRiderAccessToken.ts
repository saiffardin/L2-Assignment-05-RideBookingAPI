import { envVars } from "../../config";
import httpStatus from "http-status-codes";
import { CustomJwtPayload } from "../jwt/types";
import { Role, UserAccount } from "../../constants";
import { generateToken, verifyToken } from "../jwt";
import AppError from "../../error-helpers/AppError";
import { IRider } from "../../modules/rider/interfaces/IRider";
import { Rider } from "../../modules/rider/rider.model";

const validateRiderForTokenRenewal = async (user: IRider) => {
  const { accountStatus, isDeleted } = user;

  if (
    accountStatus === UserAccount.BLOCKED ||
    accountStatus === UserAccount.INACTIVE
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Rider account is ${accountStatus}.`
    );
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
