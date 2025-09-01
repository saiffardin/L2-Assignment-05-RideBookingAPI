import bcryptjs from "bcryptjs";
import { Role } from "@/app/constants";
import { Driver } from "../driver.model";
import httpStatus from "http-status-codes";
import { IDriver } from "../interfaces/IDriver";
import AppError from "@/app/error-helpers/AppError";
import { createUserTokens } from "@/app/utils/user-tokens";

export const loginDriver = async (
  payload: Pick<IDriver, "email" | "password">
) => {
  const { email, password } = payload;

  const user = await Driver.findOne({ email });

  if (!user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Driver does not exist. Create account first."
    );
  }

  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Wrong password.");
  }

  const tokens = createUserTokens({
    userId: user._id,
    email,
    role: Role.DRIVER,
  });

  return tokens;
};
