import { acceptTrip } from "./accept-trip";
import { availableTripList } from "./available-trip-list";
import { cancelTrip } from "./cancel-trip";
import { requestTrip } from "./request-trip";
import { tripComplete } from "./trip-complete";
import { tripStart } from "./trip-start";

export const TripControllers = {
  requestTrip,
  cancelTrip,
  acceptTrip,
  availableTripList,
  tripStart,
  tripComplete,
};
