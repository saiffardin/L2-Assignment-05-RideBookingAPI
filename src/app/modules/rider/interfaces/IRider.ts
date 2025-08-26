import { TripStatus, UserStatus } from "@/app/constants";
import { Types } from "mongoose";

export interface IRider {
  _id?: Types.ObjectId;

  name: string;
  email: string; // unique
  password: string; // hashed

  phone?: string;
  picture?: string;
  isDeleted?: boolean;
  userStatus?: UserStatus; // previously "IsActive"
  isVerified?: boolean;
  tripStatus?: TripStatus;
}
