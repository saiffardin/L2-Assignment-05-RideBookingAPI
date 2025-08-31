import { Router } from "express";
import { RiderControllers } from "./controllers";
import { createRiderZodSchema } from "./validations";
import { validateZodRequest } from "@/app/middlewares/validateZodRequest";

export const RiderRoutes = Router();

RiderRoutes.post(
  "/register",
  validateZodRequest(createRiderZodSchema),
  RiderControllers.createRider
);

// RiderRoutes.post(
//   "/login",
//   validateZodRequest(loginZodSchema),
//   addUserRole(Role.DRIVER),
//   LoginControllers.login
// );

// UserRoutes.get(
//   "/all-users",
//   checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
//   UserControllers.getAllUsers
// );

// UserRoutes.patch(
//   "/:userId",
//   checkAuth(...Object.values(Role)),
//   validateZodRequest(updateUserZodSchema),
//   UserControllers.updateUser
// );
