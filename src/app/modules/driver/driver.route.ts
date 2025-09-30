import { Router } from "express";
import { DriverControllers } from "./controllers";
import {
  createDriverZodSchema,
  loginDriverZodSchema,
  setAvailabilityZodSchema,
} from "./validations";
import { validateZodRequest } from "../../middlewares/validateZodRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../constants";

export const DriverRoutes = Router();

DriverRoutes.post(
  "/register",
  validateZodRequest(createDriverZodSchema),
  DriverControllers.createDriver
);

DriverRoutes.post(
  "/login",
  validateZodRequest(loginDriverZodSchema),
  DriverControllers.loginDriver
);

DriverRoutes.post(
  "/availability",
  checkAuth(Role.DRIVER),
  validateZodRequest(setAvailabilityZodSchema),
  DriverControllers.setAvailability
);

DriverRoutes.get(
  "/earnings/history",
  checkAuth(Role.DRIVER),
  DriverControllers.earningsHistory
);
