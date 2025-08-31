import bcryptjs from "bcryptjs";
import { envVars } from "@/app/config";
import { Rider } from "../rider.model";
import { IRider } from "../interfaces/IRider";
import httpStatusCodes from "http-status-codes";
import AppError from "@/app/error-helpers/AppError";
import { TripStatus, UserStatus } from "@/app/constants";

export const createRider = async (payload: Partial<IRider>) => {
  const { email, password, ...rest } = payload;

  const isUserExist = await Rider.findOne({ email });

  if (isUserExist) {
    throw new AppError(httpStatusCodes.BAD_REQUEST, "Rider Already Exist.");
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const user = await Rider.create({
    email,
    password: hashedPassword,
    ...rest,
    isDeleted: false,
    userStatus: UserStatus.ACTIVE,
    isVerified: false,
    tripStatus: TripStatus.OFFLINE,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...restUser } = user.toObject();

  return restUser;
};
