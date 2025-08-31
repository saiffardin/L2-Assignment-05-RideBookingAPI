import { Role } from "@/app/constants";
import { Types } from "mongoose";

export interface IAdmin {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: Role.SUPER_ADMIN | Role.ADMIN;
  isVerified?: boolean;
}
