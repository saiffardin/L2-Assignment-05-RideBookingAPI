import { TripStatus, UserStatus } from "@/app/constants";
import { ILogin } from "@/app/interfaces/ILogin";
import { Types } from "mongoose";

export interface IRider extends ILogin {
  _id?: Types.ObjectId;
  name: string;
  phone?: string;
  picture?: string;
  isDeleted?: boolean;
  userStatus?: UserStatus; // previously "IsActive"
  isVerified?: boolean;
  tripStatus?: TripStatus;
}
