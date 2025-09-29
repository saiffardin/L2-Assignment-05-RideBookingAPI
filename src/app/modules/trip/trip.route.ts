import { Router } from "express";
import { TripControllers } from "./controllers";

import { validateZodRequest } from "@/app/middlewares/validateZodRequest";
import { tripRequestZodSchema } from "./validations";
import { checkAuth } from "@/app/middlewares/checkAuth";
import { Role } from "@/app/constants";

export const TripRoutes = Router();

TripRoutes.post(
  "/request",
  validateZodRequest(tripRequestZodSchema),
  checkAuth(Role.RIDER),
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
  checkAuth(Role.RIDER, Role.DRIVER, Role.ADMIN, Role.SUPER_ADMIN),
  TripControllers.cancelTrip
);

TripRoutes.get("/history", checkAuth(Role.RIDER), TripControllers.riderHistory);

TripRoutes.post(
  "/:tripId/accept",
  checkAuth(Role.DRIVER),
  TripControllers.acceptTrip
);
