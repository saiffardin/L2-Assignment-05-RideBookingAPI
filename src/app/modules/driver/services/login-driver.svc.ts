import bcryptjs from "bcryptjs";
import { Role } from "@/app/constants";
import { Driver } from "../driver.model";
import { IDriver } from "../interfaces/IDriver";
import httpStatusCodes from "http-status-codes";
import AppError from "@/app/error-helpers/AppError";
import { createUserTokens } from "@/app/utils/user-tokens";

type PayloadType = Pick<IDriver, "email" | "password">;

export const loginDriver = async (payload: PayloadType) => {
  const { email, password } = payload;

  const driver = await Driver.findOne({ email });

  if (!driver) {
    throw new AppError(
      httpStatusCodes.BAD_REQUEST,
      "Driver does not exist. Create driver account first."
    );
  }

  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    driver.password
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatusCodes.BAD_REQUEST, "Wrong password.");
  }

  const tokens = createUserTokens({
    userId: driver._id,
    email: driver.email,
    role: Role.DRIVER,
  });

  return tokens;
};
