import bcryptjs from "bcryptjs";
import { RoleType } from "@/app/constants";
import httpStatus from "http-status-codes";
import { ILogin } from "@/app/interfaces/ILogin";
import AppError from "@/app/error-helpers/AppError";
import { createUserTokens } from "@/app/utils/user-tokens";
import { getModelByRole } from "@/app/utils/getModelByRole";

interface PayloadType extends ILogin {
  role: RoleType;
}

export const login = async (payload: PayloadType) => {
  const { email, password, role } = payload;

  const UserModel = getModelByRole(role);
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "User does not exist. Create account first."
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
    role,
  });

  return tokens;
};

export const LoginService = { login };
