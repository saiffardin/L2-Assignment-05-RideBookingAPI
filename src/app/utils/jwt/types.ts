import { Types } from "mongoose";
import { JwtPayload } from "jsonwebtoken";
import { RoleType } from "../../constants";

export interface CustomJwtPayload extends JwtPayload {
  userId: Types.ObjectId | string;
  email: string;
  role: RoleType;
}
