import { Types } from "mongoose";
import { UserAccount, UserStatus } from "@/app/constants";

export interface IRider {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone?: string;
  picture?: string;
  isDeleted?: boolean;
  accountStatus?: UserAccount;
  isVerified?: boolean;
  status?: UserStatus;
}
