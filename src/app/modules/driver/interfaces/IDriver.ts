import { Types } from "mongoose";
import { UserStatus, UserAccount } from "@/app/constants";

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
  accountStatus?: UserAccount;
  isVerified?: boolean;
  status?: UserStatus;
}

export interface IVehicleInfo {
  type: string;
  numberPlate: string;
}
