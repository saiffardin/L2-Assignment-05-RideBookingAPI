import { z } from "zod";
import {
  emailZodValidation,
  passwordZodValidation,
} from "../../../utils/common-zod-validations";

export const loginDriverZodSchema = z.object({
  email: emailZodValidation,
  password: passwordZodValidation,
});

export type LoginDriverZodSchemaType = z.infer<typeof loginDriverZodSchema>;
