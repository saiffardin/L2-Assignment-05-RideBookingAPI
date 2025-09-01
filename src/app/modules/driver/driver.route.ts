import { Router } from "express";
import { DriverControllers } from "./controllers";
import { createDriverZodSchema, loginDriverZodSchema } from "./validations";
import { validateZodRequest } from "@/app/middlewares/validateZodRequest";

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
