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

/**
 * checked with rider only
 * not checked with driver, admin, super-admin
 */
TripRoutes.post(
  "/cancel/:tripId",
  checkAuth(Role.RIDER, Role.DRIVER, Role.ADMIN, Role.SUPER_ADMIN),
  TripControllers.cancelTrip
);

TripRoutes.get("/history", checkAuth(Role.RIDER), TripControllers.riderHistory);
