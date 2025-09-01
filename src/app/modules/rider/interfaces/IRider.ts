import { Types } from "mongoose";
import { TripStatus, UserStatus } from "@/app/constants";

export interface IRider {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone?: string;
  picture?: string;
  isDeleted?: boolean;
  userStatus?: UserStatus; // previously "IsActive"
  isVerified?: boolean;
  tripStatus?: TripStatus;
}
