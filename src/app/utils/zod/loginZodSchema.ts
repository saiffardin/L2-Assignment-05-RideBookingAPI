import { z } from "zod";
import {
  emailZodValidation,
  passwordZodValidation,
} from "./common-validations";

export const loginZodSchema = z.object({
  email: emailZodValidation,
  password: passwordZodValidation,
});

export type LoginZodSchemaType = z.infer<typeof loginZodSchema>;
