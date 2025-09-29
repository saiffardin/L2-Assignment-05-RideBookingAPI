import { acceptTrip } from "./accept-trip";
import { availableTripList } from "./available-trip-list";
import { cancelTrip } from "./cancel-trip";
import { earningsHistory } from "./earnings-history";
import { requestTrip } from "./request-trip";
import { riderHistory } from "./rider-history";
import { tripComplete } from "./trip-complete";
import { tripStart } from "./trip-start";

export const TripControllers = {
  requestTrip,
  cancelTrip,
  riderHistory,
  acceptTrip,
  availableTripList,
  tripStart,
  tripComplete,
  earningsHistory,
};
