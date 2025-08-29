import { model, Schema } from "mongoose";
import { IDriver, IVehicleInfo } from "./interfaces/IDriver";
import { DriverStatus, UserStatus, VehicleType } from "@/app/constants";

const vehicleInfoSchema = new Schema<IVehicleInfo>(
  {
    type: {
      type: String,
      enum: Object.values(VehicleType),
      required: true,
    },
    numberPlate: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    _id: false,
  }
);

const driverSchema = new Schema<IDriver>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    drivingLicense: { type: String, required: true },
    vehicleInfo: vehicleInfoSchema,
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
      enum: Object.values(DriverStatus),
      default: DriverStatus.ONLINE,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Driver = model<IDriver>("Driver", driverSchema);
