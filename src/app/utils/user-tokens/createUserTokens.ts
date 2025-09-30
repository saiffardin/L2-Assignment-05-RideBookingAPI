import { generateToken } from "../jwt";
import { envVars } from "../../config";
import httpCodes from "http-status-codes";
import { CustomJwtPayload } from "../jwt/types";
import AppError from "../../error-helpers/AppError";

export const createUserTokens = (payload: CustomJwtPayload) => {
  if (!payload.userId || !payload.email || !payload.role) {
    throw new AppError(httpCodes.BAD_REQUEST, "Missing User Info.");
  }

  const accessToken = generateToken(
    payload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );

  const refreshToken = generateToken(
    payload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES
  );

  return {
    accessToken,
    refreshToken,
  };
};
