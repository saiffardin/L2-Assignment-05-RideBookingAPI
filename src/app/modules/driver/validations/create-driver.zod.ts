import { z } from "zod";
import {
  emailZodValidation,
  isDeletedZodValidation,
  nameZodValidation,
  passwordZodValidation,
  phoneZodValidation,
  pictureZodValidation,
  userStatusZodValidation,
} from "@/app/utils/zod/common-validations";
import { DriverStatus, VehicleType } from "@/app/constants";

export const vehicleInfoSchema = z.object({
  type: z.nativeEnum(VehicleType),
  numberPlate: z
    .string()
    .regex(
      /^[a-zA-Z]+(-[a-zA-Z]+)*-\d{2}-\d{1,4}$/,
      "Invalid Bangladeshi number plate format"
    ),
});

export const createDriverZodSchema = z.object({
  name: nameZodValidation,
  email: emailZodValidation,
  password: passwordZodValidation,
  phone: phoneZodValidation,
  picture: pictureZodValidation,
  isDeleted: isDeletedZodValidation,
  userStatus: userStatusZodValidation,

  drivingLicense: z
    .string()
    .regex(
      /^[a-zA-Z]{2}-\d{4}-\d{1,6}$/,
      "Invalid Bangladeshi driving license format"
    ),

  vehicleInfo: vehicleInfoSchema,

  isVerified: z.boolean().default(false),
  tripStatus: z.nativeEnum(DriverStatus).default(DriverStatus.ONLINE),
});

export type CreateDriverZodSchemaType = z.infer<typeof createDriverZodSchema>;
