import { z } from "zod";

import { UserStatus } from "@/app/constants";

export const setAvailabilityZodSchema = z.object({
  status: z.enum([UserStatus.ONLINE, UserStatus.OFFLINE]),
});

export type SetAvailabilityZodSchemaType = z.infer<
  typeof setAvailabilityZodSchema
>;
