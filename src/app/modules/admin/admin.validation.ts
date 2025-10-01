import { z } from "zod";
import {
  emailZodValidation,
  passwordZodValidation,
} from "../../utils/common-zod-validations";
import { Role } from "../../constants";

export const loginAdminZodSchema = z.object({
  email: emailZodValidation,
  password: passwordZodValidation,
});

export const userRiderDriverZodSchema = z.object({
  role: z.enum([Role.RIDER, Role.DRIVER]),
});

export type LoginAdminZodSchemaType = z.infer<typeof loginAdminZodSchema>;
export type UserRiderDriverZodSchemaType = z.infer<
  typeof userRiderDriverZodSchema
>;
