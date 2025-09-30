import { Location } from "./location.model";
import httpStatusCodes from "http-status-codes";
import AppError from "../../error-helpers/AppError";
import { LocationNameType } from "../../constants/enum.locations";
import { locationsData } from "./location.data";

const calculateFare = async (
  pickUp: LocationNameType,
  dest: LocationNameType
) => {
  const locArr = await Location.find({ name: pickUp });

  if (!locArr || locArr.length === 0) {
    const msg = "Pick-up location not found.";
    throw new AppError(httpStatusCodes.NOT_FOUND, msg);
  }

  const destDB = locArr?.[0]?.fares?.find((item) => item?.destination === dest);
  return destDB?.fare ?? 0;
};

const seedLocations = async () => {
  await Location.deleteMany({});

  // eslint-disable-next-line no-console
  console.log("==================");

  // eslint-disable-next-line no-console
  console.log("Cleared old locations.");

  const locs = await Location.insertMany(locationsData);

  // eslint-disable-next-line no-console
  console.log("Seeded locations successfully. 🚀");

  return locs;
};

export const LocationServices = {
  calculateFare,
  seedLocations,
};
