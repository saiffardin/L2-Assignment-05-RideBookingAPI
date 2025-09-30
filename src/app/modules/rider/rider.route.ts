import { Router } from "express";
import { RiderControllers } from "./controllers";
import { createRiderZodSchema, loginRiderZodSchema } from "./validations";
import { validateZodRequest } from "@/app/middlewares/validateZodRequest";
import { checkAuth } from "@/app/middlewares/checkAuth";
import { Role } from "@/app/constants";

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
