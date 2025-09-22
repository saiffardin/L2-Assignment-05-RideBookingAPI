import { Schema, model } from "mongoose";
import { ILocation } from "./location.interface";
import { LocationName } from "@/app/constants/enum.locations";

const LocationSchema = new Schema<ILocation>({
  name: {
    type: String,
    enum: Object.values(LocationName),
    required: true,
    unique: true,
    trim: true,
  },
  description: { type: String, default: "" },
  fares: [
    {
      _id: false,
      destination: {
        type: String,
        enum: Object.values(LocationName),
        required: true,
      },
      fare: { type: Number, required: true, min: 0 },
    },
  ],
});

export const Location = model<ILocation>("Location", LocationSchema);
