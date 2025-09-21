/* eslint-disable no-console */

import { locationsData } from "../modules/location/location.data";
import { Location } from "../modules/location/location.model";

export const seedLocations = async () => {
  try {
    await Location.deleteMany({});
    console.log("Cleared old locations.");

    await Location.insertMany(locationsData);
    console.log("Seeded locations successfully. 🚀");
  } catch (error) {
    console.log(error);
  }
};
