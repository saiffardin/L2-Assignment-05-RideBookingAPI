// import AppError from "@/app/errorHelpers/AppError";
// import { IAuthProvider, IUser } from "../interfaces";
// import { User } from "../user.model";
// import httpStatus from "http-status-codes";
// import bcryptjs from "bcryptjs";
// import { envVars } from "@/app/config";
import httpStatusCodes from "http-status-codes";

import AppError from "@/app/error-helpers/AppError";
import { Driver } from "../driver.model";
import { IDriver } from "../interfaces/IDriver";

export const createDriver = async (payload: Partial<IDriver>) => {
  const { email, password, ...rest } = payload;

  const isUserExist = await Driver.findOne({ email });

  if (isUserExist) {
    throw new AppError(httpStatusCodes.BAD_REQUEST, "Driver Already Exist.");
  }

  /*
  const hashedPassword = await bcryptjs.hash(
    password as string,
    10
    // Number(envVars.BCRYPT_SALT_ROUND)
  );

  // const isPasswordMatched = await bcryptjs.compare(
  //   password as string,
  //   hashedPassword
  // );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };
  */

  const user = await Driver.create({
    email,
    password,
    // password: hashedPassword,
    // auths: [authProvider],
    ...rest,
  });

  return user;
};
