import { z } from "zod";
import { LocationName } from "@/app/constants/enum.locations";

export const tripRequestZodSchema = z.object({
  pickup: z.nativeEnum(LocationName),
  destination: z.nativeEnum(LocationName),
});

export type TripRequestInputType = z.infer<typeof tripRequestZodSchema>;
