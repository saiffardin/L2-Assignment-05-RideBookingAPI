import { Router } from "express";
import { LocationControllers } from "./location.controller";

export const LocationRoutes = Router();

LocationRoutes.post("/seed", LocationControllers.seedLocations);
