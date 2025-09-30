import bcryptjs from "bcryptjs";
import { Rider } from "../rider.model";
import { Role } from "../../../constants";
import httpStatus from "http-status-codes";
import { IRider } from "../interfaces/IRider";
import AppError from "../../../error-helpers/AppError";
import { createUserTokens } from "../../../utils/user-tokens";

export const loginRider = async (
  payload: Pick<IRider, "email" | "password">
) => {
  const { email, password } = payload;

  const user = await Rider.findOne({ email });

  if (!user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Rider does not exist. Create account first."
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
    role: Role.RIDER,
  });

  return tokens;
};
