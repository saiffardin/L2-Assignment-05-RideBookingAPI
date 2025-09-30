import { Role } from "../../constants";
import { Schema, model } from "mongoose";
import { IAdmin } from "./admin.interface";

const AdminSchema = new Schema<IAdmin>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [Role.ADMIN, Role.SUPER_ADMIN],
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Admin = model<IAdmin>("Admin", AdminSchema);
