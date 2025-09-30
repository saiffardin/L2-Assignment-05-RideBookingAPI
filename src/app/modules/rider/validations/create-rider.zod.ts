import { z } from "zod";
import {
  emailZodValidation,
  isDeletedZodValidation,
  nameZodValidation,
  passwordZodValidation,
  phoneZodValidation,
  pictureZodValidation,
  userAccountZodValidation,
} from "../../../utils/common-zod-validations";
import { UserStatus } from "../../../constants";

export const createRiderZodSchema = z.object({
  name: nameZodValidation,
  email: emailZodValidation,
  password: passwordZodValidation,

  phone: phoneZodValidation,
  picture: pictureZodValidation,
  isDeleted: isDeletedZodValidation,
  accountStatus: userAccountZodValidation,

  isVerified: z.boolean().default(false),
  status: z.nativeEnum(UserStatus).default(UserStatus.OFFLINE),
});

export type CreateRiderZodSchemaType = z.infer<typeof createRiderZodSchema>;
