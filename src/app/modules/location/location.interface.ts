import { LocationNameType } from "../../constants/enum.locations";

export interface IFare {
  destination: string;
  fare: number;
}

export interface ILocation {
  name: LocationNameType;
  description: string;
  fares: IFare[];
}
