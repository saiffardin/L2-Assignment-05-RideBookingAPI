import httpStatusCodes from "http-status-codes";
import AppError from "@/app/error-helpers/AppError";
import { Driver } from "../driver.model";
import { IDriver } from "../interfaces/IDriver";
import bcryptjs from "bcryptjs";
import { envVars } from "@/app/config";
import { UserStatus, UserAccount } from "@/app/constants";

export const createDriver = async (payload: Partial<IDriver>) => {
  const { email, password, ...rest } = payload;

  const isUserExist = await Driver.findOne({ email });

  if (isUserExist) {
    throw new AppError(httpStatusCodes.BAD_REQUEST, "Driver Already Exist.");
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const user = await Driver.create({
    email,
    password: hashedPassword,
    ...rest,
    isDeleted: false,
    accountStatus: UserAccount.ACTIVE,
    isVerified: false,
    status: UserStatus.ONLINE,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...restUser } = user.toObject();

  return restUser;
};
