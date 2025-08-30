import { z } from "zod";
import { UserStatus } from "@/app/constants";

export const nameZodValidation = z
  .string({ invalid_type_error: "Name must be string." })
  .min(2, { message: "Name must be at least 2 characters long." })
  .max(50, { message: "Name cannot exceed 50 characters." });

export const emailZodValidation = z
  .string({ invalid_type_error: "Email must be string." })
  .email({ message: "Invalid email address format." })
  .min(5, { message: "Email must be at least 5 characters long." })
  .max(100, { message: "Email cannot exceed 100 characters." });

export const passwordZodValidation = z
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
  });

export const phoneZodValidation = z
  .string({ invalid_type_error: "Phone Number must be string." })
  .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
    message:
      "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
  })
  .optional();

export const pictureZodValidation = z.string().url("Invalid URL").optional();

export const isDeletedZodValidation = z.boolean().default(false);

export const userStatusZodValidation = z
  .nativeEnum(UserStatus)
  .default(UserStatus.ACTIVE);
