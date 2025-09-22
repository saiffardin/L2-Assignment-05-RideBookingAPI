export enum TripStatus {
  OFFLINE = "OFFLINE",
  SEARCHING_DRIVER = "SEARCHING_DRIVER", // Requested
  DRIVER_ASSIGNED = "DRIVER_ASSIGNED", // Accepted
  TRIP_STARTED = "TRIP_STARTED", // Picked UP + In transit
  TRIP_COMPLETED = "TRIP_COMPLETED", // completed
  CANCELLED = "CANCELLED", // cancelled
}

export type TripTypes = (typeof TripStatus)[keyof typeof TripStatus];

export const allowedTransitions: Record<TripStatus, TripStatus[]> = {
  [TripStatus.OFFLINE]: [TripStatus.SEARCHING_DRIVER],
  [TripStatus.SEARCHING_DRIVER]: [
    TripStatus.DRIVER_ASSIGNED,
    TripStatus.CANCELLED,
  ],
  [TripStatus.DRIVER_ASSIGNED]: [TripStatus.TRIP_STARTED, TripStatus.CANCELLED],
  [TripStatus.TRIP_STARTED]: [TripStatus.TRIP_COMPLETED, TripStatus.CANCELLED],
  [TripStatus.TRIP_COMPLETED]: [],
  [TripStatus.CANCELLED]: [],
};
