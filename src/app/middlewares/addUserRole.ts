import { RoleType } from "../constants";
import { type NextFunction, type Request, type Response } from "express";

export const addUserRole = (role: RoleType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.body = {
      ...req.body,
      role,
    };

    next();
  };
};
