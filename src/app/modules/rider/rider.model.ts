import { Schema, model } from "mongoose";
import { IRider } from "./interfaces/IRider";
import { TripStatus, UserStatus } from "@/app/constants";

const RiderSchema = new Schema<IRider>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    phone: { type: String },
    picture: { type: String },
    isDeleted: { type: Boolean, default: false },
    userStatus: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
    },
    isVerified: { type: Boolean, default: false },
    tripStatus: {
      type: String,
      enum: Object.values(TripStatus),
      default: TripStatus.OFFLINE,
    },
  },
  { timestamps: true }
);

export const Rider = model<IRider>("Rider", RiderSchema);
