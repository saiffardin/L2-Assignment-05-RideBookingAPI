import { z } from "zod";
import {
  emailZodValidation,
  isDeletedZodValidation,
  nameZodValidation,
  passwordZodValidation,
  phoneZodValidation,
  pictureZodValidation,
  userStatusZodValidation,
} from "@/app/utils/common-zod-validations";
import { TripStatus } from "@/app/constants";

export const createRiderZodSchema = z.object({
  name: nameZodValidation,
  email: emailZodValidation,
  password: passwordZodValidation,

  phone: phoneZodValidation,
  picture: pictureZodValidation,
  isDeleted: isDeletedZodValidation,
  userStatus: userStatusZodValidation,

  isVerified: z.boolean().default(false),
  tripStatus: z.nativeEnum(TripStatus).default(TripStatus.OFFLINE),
});

export type CreateRiderZodSchemaType = z.infer<typeof createRiderZodSchema>;
