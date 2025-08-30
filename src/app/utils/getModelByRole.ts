import { Role, RoleType } from "../constants";
import AppError from "../error-helpers/AppError";
import { Driver } from "../modules/driver/driver.model";
import httpStatus from "http-status-codes";

// TODO ::: update this file when new user is added
export const getModelByRole = (role: RoleType) => {
  switch (role) {
    case Role.DRIVER:
      return Driver;

    /*
    case Role.RIDER:
      UserModel = Rider;
      break;

    case Role.ADMIN:
      UserModel = Admin;
      break;
    */

    default:
      throw new AppError(httpStatus.BAD_REQUEST, `Invalid role: ${role}`);
  }
};
