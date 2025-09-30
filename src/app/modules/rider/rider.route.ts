import { Router } from "express";
import { RiderControllers } from "./controllers";
import { createRiderZodSchema, loginRiderZodSchema } from "./validations";
import { validateZodRequest } from "../../middlewares/validateZodRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../constants";

export const RiderRoutes = Router();

RiderRoutes.post(
  "/register",
  validateZodRequest(createRiderZodSchema),
  RiderControllers.createRider
);

RiderRoutes.post(
  "/login",
  validateZodRequest(loginRiderZodSchema),
  RiderControllers.loginRider
);

RiderRoutes.get(
  "/history",
  checkAuth(Role.RIDER),
  RiderControllers.riderHistory
);
