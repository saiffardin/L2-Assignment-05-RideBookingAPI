import { envVars } from "../config";
import { excludedPaths, RoleType } from "../constants";
import { verifyToken } from "../utils/jwt";
import httpStatusCodes from "http-status-codes";
import AppError from "../error-helpers/AppError";
import { NextFunction, Request, Response } from "express";
import { checkAccountStatus } from "../utils/checkAccountStatus";

export const checkAuth =
  (...authRoles: RoleType[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bearerToken = req.headers.authorization;

      const accessToken = bearerToken?.split(" ")[1];

      const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET);

      if (!authRoles.includes(verifiedToken.role)) {
        const msg = `You (${verifiedToken.role}) are not permitted for this route.`;
        throw new AppError(httpStatusCodes.FORBIDDEN, msg);
      }

      const isCheckAccount = !excludedPaths.includes(req.originalUrl);

      console.log("req.originalUrl:", req.originalUrl);
      console.log("req.path:", req.path);
      console.log("excludedPaths:", excludedPaths);
      console.log("isCheckAccount:", isCheckAccount);

      if (isCheckAccount) {
        await checkAccountStatus(
          verifiedToken.userId as string,
          verifiedToken.role
        );
      }

      req.user = verifiedToken;
      next();
    } catch (error) {
      console.error("jwt error", error);
      next(error);
    }
  };
