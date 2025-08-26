import { DriverStatus, UserStatus } from "@/app/constants";
import { Types } from "mongoose";
// import { IAuthProvider } from "./IAuthProvider";

export interface IDriver {
  _id?: Types.ObjectId;

  name: string;
  email: string;
  password: string;
  drivingLicense: string;
  vehicleInfo: IVehicleInfo;

  phone?: string;
  picture?: string;
  isDeleted?: boolean;
  userStatus?: UserStatus; // previously "IsActive"
  isVerified?: boolean;
  tripStatus?: DriverStatus;

  /*
  rating?: {
    average: number;
    count: number;
  };
  earning?: {
    total: number;
    count: number;
  };
  */

  // auths: IAuthProvider[];
  // bookings?: Types.ObjectId[];
  // guides?: Types.ObjectId[];
}

export interface IVehicleInfo {
  type: string;
  numberPlate: string;
}
