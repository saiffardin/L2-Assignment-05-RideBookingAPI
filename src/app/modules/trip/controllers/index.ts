import { acceptTrip } from "./accept-trip";
import { availableTripList } from "./available-trip-list";
import { cancelTrip } from "./cancel-trip";
import { requestTrip } from "./request-trip";
import { riderHistory } from "./rider-history";
import { tripStart } from "./trip-start";

export const TripControllers = {
  requestTrip,
  cancelTrip,
  riderHistory,
  acceptTrip,
  availableTripList,
  tripStart,
};
