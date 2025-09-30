import { Role, TripStatus } from "../../constants";
import { Schema, model } from "mongoose";
import { ITrip } from "./trip.interface";
import { LocationName } from "../../constants/enum.locations";

const TripHistorySchema = new Schema(
  {
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    actorRole: {
      type: String,
      enum: Object.values(Role),
    },
    actorId: Schema.Types.ObjectId,
    note: String,
  },
  { _id: false }
);

const TripSchema = new Schema<ITrip>({
  riderId: {
    type: Schema.Types.ObjectId,
    ref: "Rider",
    required: true,
    index: true,
  },

  driverId: { type: Schema.Types.ObjectId, ref: "Driver", default: null },

  pickup: {
    type: String,
    enum: Object.values(LocationName),
    required: true,
  },

  destination: {
    type: String,
    enum: Object.values(LocationName),
    required: true,
  },

  status: {
    type: String,
    required: true,
    default: TripStatus.SEARCHING_DRIVER,
  },

  fare: { type: Number, default: 0 },
  requestedAt: { type: Date, default: Date.now },
  acceptedAt: Date,
  pickedUpAt: Date,
  completedAt: Date,
  cancelledAt: Date,

  history: { type: [TripHistorySchema], default: [] },
});

export const Trip = model<ITrip>("Trip", TripSchema);
