import { envVars } from "@/app/config";
import httpStatus from "http-status-codes";
import { CustomJwtPayload } from "../jwt/types";
import { generateToken, verifyToken } from "../jwt";
import { Role, RoleType, UserStatus } from "@/app/constants";
import AppError from "@/app/error-helpers/AppError";
import { Driver } from "@/app/modules/driver/driver.model";
import { IDriver } from "@/app/modules/driver/interfaces/IDriver";

export type UserType = Partial<IDriver>;

const validateUserForTokenRenewal = async (user: UserType, role: RoleType) => {
  const { userStatus, isDeleted } = user;

  if (userStatus === UserStatus.BLOCKED || userStatus === UserStatus.INACTIVE) {
    throw new AppError(httpStatus.BAD_REQUEST, `${role} is ${userStatus}.`);
  }

  if (isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, `${role} is deleted.`);
  }
};

export const renewAccessToken = async (
  refreshToken: string,
  role: RoleType
) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET
  ) as CustomJwtPayload;

  let UserModel;

  switch (role) {
    case Role.DRIVER:
      UserModel = Driver;
      break;

    /*
    case Role.RIDER:
      UserModel = Rider;
      break;

    case Role.ADMIN:
      UserModel = Admin;
      break;
    */

    default:
      throw new AppError(httpStatus.BAD_REQUEST, `Invalid role: ${role}`);
  }

  if (!UserModel) {
    throw new Error(`Invalid role: ${role}`);
  }

  const user = await UserModel.findOne({ email: verifiedRefreshToken.email });

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User does not exist.");
  }

  await validateUserForTokenRenewal(user, role);

  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: role,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );

  return accessToken;
};
