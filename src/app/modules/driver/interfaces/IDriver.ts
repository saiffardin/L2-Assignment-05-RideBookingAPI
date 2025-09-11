import { Types } from "mongoose";
import { DriverStatus, UserStatus } from "@/app/constants";

export interface IDriver {
  _id?: Types.ObjectId;

  name: string;
  email: string;
  password: string;
  drivingLicense: string;
  vehicleInfo: IVehicleInfo;
  earnings: { totalIncome: number; totalTrips: number };

  phone?: string;
  picture?: string;
  isDeleted?: boolean;
  userStatus?: UserStatus;
  isVerified?: boolean;
  status?: DriverStatus;
}

export interface IVehicleInfo {
  type: string;
  numberPlate: string;
}
