import bcryptjs from "bcryptjs";
import { Admin } from "./admin.model";
import { IAdmin } from "./admin.interface";
import httpStatusCodes from "http-status-codes";
import AppError from "../../error-helpers/AppError";
import { createUserTokens } from "../../utils/user-tokens";
import { Driver } from "../driver/driver.model";
import { Rider } from "../rider/rider.model";
import { Trip } from "../trip/trip.model";
import { Role, UserAccount } from "../../constants";
import { Model } from "mongoose";

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

const getAllDrivers = async () => await Driver.find();

const getAllRiders = async () => await Rider.find();

const getAllTrips = async () => await Trip.find();

const approveDriver = async (driverId: string) => {
  const driver = await Driver.findByIdAndUpdate(
    driverId,
    { isVerified: true, accountStatus: UserAccount.APPROVED },
    { new: true, runValidators: true }
  );

  if (!driver) {
    throw new AppError(httpStatusCodes.NOT_FOUND, "Driver not found.");
  }

  return driver;
};

const suspendDriver = async (driverId: string) => {
  const driver = await Driver.findByIdAndUpdate(
    driverId,
    { accountStatus: UserAccount.SUSPEND },
    { new: true, runValidators: true }
  );

  if (!driver) {
    throw new AppError(httpStatusCodes.NOT_FOUND, "Driver not found.");
  }

  return driver;
};

const blockUser = async (userId: string, role: Role.DRIVER | Role.RIDER) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const model: Model<any> = role === Role.DRIVER ? Driver : Rider;

  const user = await model.findByIdAndUpdate(
    userId,
    { accountStatus: UserAccount.BLOCKED },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new AppError(httpStatusCodes.NOT_FOUND, `${role} not found.`);
  }

  return user;
};

const unblockUser = async (userId: string, role: Role.DRIVER | Role.RIDER) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const model: Model<any> = role === Role.DRIVER ? Driver : Rider;

  const user = await model.findByIdAndUpdate(
    userId,
    { accountStatus: UserAccount.UNBLOCKED },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new AppError(httpStatusCodes.NOT_FOUND, `${role} not found.`);
  }

  return user;
};

export const AdminServices = {
  loginAdmin,
  getAllDrivers,
  getAllRiders,
  getAllTrips,
  approveDriver,
  suspendDriver,
  blockUser,
  unblockUser,
};
