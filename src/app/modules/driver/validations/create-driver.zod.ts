import { z } from "zod";
import { DriverStatus, UserStatus, VehicleType } from "@/app/constants";

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
  name: z
    .string({ invalid_type_error: "Name must be string." })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." }),

  email: z
    .string({ invalid_type_error: "Email must be string." })
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email cannot exceed 100 characters." }),

  password: z
    .string({ invalid_type_error: "Password must be string." })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    }),

  drivingLicense: z
    .string()
    .regex(
      /^[a-zA-Z]{2}-\d{4}-\d{1,6}$/,
      "Invalid Bangladeshi driving license format"
    ),

  vehicleInfo: vehicleInfoSchema,

  phone: z
    .string({ invalid_type_error: "Phone Number must be string." })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),

  picture: z.string().url("Invalid URL").optional(),

  isDeleted: z.boolean().default(false),
  userStatus: z.nativeEnum(UserStatus).default(UserStatus.ACTIVE),
  isVerified: z.boolean().default(false),
  tripStatus: z.nativeEnum(DriverStatus).default(DriverStatus.ONLINE),
});

export type CreateDriverZodSchemaType = z.infer<typeof createDriverZodSchema>;
