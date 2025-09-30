import bcryptjs from "bcryptjs";
import { Admin } from "./admin.model";
import { IAdmin } from "./admin.interface";
import httpStatusCodes from "http-status-codes";
import AppError from "../../error-helpers/AppError";
import { createUserTokens } from "../../utils/user-tokens";

export const loginAdmin = async (
  payload: Pick<IAdmin, "email" | "password">
) => {
  const { email, password } = payload;

  const user = await Admin.findOne({ email });

  if (!user) {
    throw new AppError(
      httpStatusCodes.BAD_REQUEST,
      "Admin / Super-admin does not exist."
    );
  }

  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatusCodes.BAD_REQUEST, "Wrong password.");
  }

  const tokens = createUserTokens({
    userId: user._id,
    email,
    role: user.role,
  });

  return { ...tokens, role: user.role };
};

export const AdminServices = { loginAdmin };
