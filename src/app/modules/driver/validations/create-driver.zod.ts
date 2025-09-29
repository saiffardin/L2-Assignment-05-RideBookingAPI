import { z } from "zod";
import {
  emailZodValidation,
  isDeletedZodValidation,
  nameZodValidation,
  passwordZodValidation,
  phoneZodValidation,
  pictureZodValidation,
  userAccountZodValidation,
} from "@/app/utils/common-zod-validations";
import { UserStatus, VehicleType } from "@/app/constants";

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
  accountStatus: userAccountZodValidation,

  drivingLicense: z
    .string()
    .regex(
      /^[a-zA-Z]{2}-\d{4}-\d{1,6}$/,
      "Invalid Bangladeshi driving license format"
    ),

  vehicleInfo: vehicleInfoSchema,

  isVerified: z.boolean().default(false),
  status: z.nativeEnum(UserStatus).default(UserStatus.ONLINE),
});

export type CreateDriverZodSchemaType = z.infer<typeof createDriverZodSchema>;
