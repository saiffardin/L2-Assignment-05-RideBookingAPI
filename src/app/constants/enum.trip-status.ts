export enum TripStatus {
  OFFLINE = "OFFLINE",
  SEARCHING_DRIVER = "SEARCHING_DRIVER", // Requested
  DRIVER_ASSIGNED = "DRIVER_ASSIGNED", // Accepted
  TRIP_STARTED = "TRIP_STARTED", // Picked UP + In transit
  TRIP_COMPLETED = "TRIP_COMPLETED", // completed
  CANCELLED = "CANCELLED", // cancelled
}

export type TripTypes = (typeof TripStatus)[keyof typeof TripStatus];
