import { Model } from "mongoose";
import httpStatus from "http-status-codes";
import { Role, RoleType } from "../constants";
import AppError from "../error-helpers/AppError";
import { Rider } from "../modules/rider/rider.model";
import { Driver } from "../modules/driver/driver.model";
import { IRider } from "../modules/rider/interfaces/IRider";
import { IDriver } from "../modules/driver/interfaces/IDriver";

export type UserType = Partial<IDriver | IRider>;

// TODO ::: update this file when new user is added
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getModelByRole = (role: RoleType): Model<any> => {
  switch (role) {
    case Role.DRIVER:
      return Driver;

    case Role.RIDER:
      return Rider;

    /*
    case Role.ADMIN:
      UserModel = Admin;
      break;
    */

    default:
      throw new AppError(httpStatus.BAD_REQUEST, `Invalid role: ${role}`);
  }
};
