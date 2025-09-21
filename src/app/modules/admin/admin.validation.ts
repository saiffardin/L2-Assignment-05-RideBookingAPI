import { z } from "zod";
import {
  emailZodValidation,
  passwordZodValidation,
} from "@/app/utils/common-zod-validations";

export const loginAdminZodSchema = z.object({
  email: emailZodValidation,
  password: passwordZodValidation,
});

export type LoginAdminZodSchemaType = z.infer<typeof loginAdminZodSchema>;
