import { z } from "zod";
import {
  emailZodValidation,
  passwordZodValidation,
} from "../../../utils/common-zod-validations";

export const loginRiderZodSchema = z.object({
  email: emailZodValidation,
  password: passwordZodValidation,
});

export type LoginRiderZodSchemaType = z.infer<typeof loginRiderZodSchema>;
