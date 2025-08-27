import jwt from "jsonwebtoken";
import { CustomJwtPayload } from "./types";
import AppError from "@/app/error-helpers/AppError";

export const verifyToken = (
  accessToken: string | undefined,
  secret: string
) => {
  if (!accessToken) {
    throw new AppError(403, "No JWT Received.");
  }

  const verifiedToken = jwt.verify(accessToken, secret) as CustomJwtPayload;

  return verifiedToken;
};
