import { RoleType, TripTypes } from "../../constants";
import { LocationNameType } from "../../constants/enum.locations";
import { Types } from "mongoose";

export interface ITripHistory {
  status: TripTypes;
  timestamp: Date;
  actorRole?: RoleType;
  actorId?: Types.ObjectId;
  note?: string;
}

export interface ITrip {
  riderId: Types.ObjectId;
  driverId?: Types.ObjectId | null;
  pickup: LocationNameType;
  destination: LocationNameType;

  status: TripTypes;
  fare?: number;
  requestedAt: Date;
  acceptedAt?: Date;
  pickedUpAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  history: ITripHistory[];
}
