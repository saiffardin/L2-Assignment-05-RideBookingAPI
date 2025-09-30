import { Router } from "express";
import { TripControllers } from "./controllers";

import { validateZodRequest } from "@/app/middlewares/validateZodRequest";
import { tripRequestZodSchema } from "./validations";
import { checkAuth } from "@/app/middlewares/checkAuth";
import { Role } from "@/app/constants";

export const TripRoutes = Router();

TripRoutes.post(
  "/request",
  checkAuth(Role.RIDER),
  validateZodRequest(tripRequestZodSchema),
  TripControllers.requestTrip
);

TripRoutes.get(
  "/available",
  checkAuth(Role.DRIVER),
  TripControllers.availableTripList
);

TripRoutes.post(
  "/:tripId/start",
  checkAuth(Role.DRIVER),
  TripControllers.tripStart
);

TripRoutes.post(
  "/:tripId/cancel",
  checkAuth(Role.RIDER, Role.DRIVER),
  TripControllers.cancelTrip
);

TripRoutes.post(
  "/:tripId/accept",
  checkAuth(Role.DRIVER),
  TripControllers.acceptTrip
);

TripRoutes.post(
  "/:tripId/complete",
  checkAuth(Role.DRIVER),
  TripControllers.tripComplete
);
