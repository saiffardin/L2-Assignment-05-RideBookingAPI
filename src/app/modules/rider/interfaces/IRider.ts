import { Types } from "mongoose";
import {  UserAccount, UserStatus } from "@/app/constants";

export interface IRider {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone?: string;
  picture?: string;
  isDeleted?: boolean;
  accountStatus?: UserAccount; // previously "IsActive"
  isVerified?: boolean;
  status?: UserStatus;
}
