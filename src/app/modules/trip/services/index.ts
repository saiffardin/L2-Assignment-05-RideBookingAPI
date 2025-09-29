import { acceptTrip } from "./accept-trip.svc";
import { availableTripList } from "./available-trip-list.svc";
import { cancelTrip } from "./cancel-trip-svc";
import { requestTrip } from "./request-trip.svc";
import { riderHistory } from "./rider-history.svc";
import { updateTripStatus } from "./update-trip-status.svc";

export const TripServices = {
  requestTrip,
  acceptTrip,
  updateTripStatus,
  cancelTrip,
  riderHistory,
  availableTripList,
};
