import { Schema, model } from "mongoose";
import { IRider } from "./interfaces/IRider";
import { UserStatus, UserAccount } from "../../constants";

const RiderSchema = new Schema<IRider>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    phone: { type: String },
    picture: { type: String },
    isDeleted: { type: Boolean, default: false },
    accountStatus: {
      type: String,
      enum: Object.values(UserAccount),
      default: UserAccount.ACTIVE,
    },
    isVerified: { type: Boolean, default: false },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.OFFLINE,
    },
  },
  { timestamps: true }
);

export const Rider = model<IRider>("Rider", RiderSchema);
