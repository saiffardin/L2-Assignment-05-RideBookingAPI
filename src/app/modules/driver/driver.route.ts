import { Router } from "express";
import { DriverControllers } from "./controllers";
import { createDriverZodSchema } from "./validations";
import { validateZodRequest } from "@/app/middlewares/validateZodRequest";
import { loginZodSchema } from "@/app/utils/zod/loginZodSchema";
import { LoginControllers } from "../login/login.controller";
import { addUserRole } from "@/app/middlewares/addUserRole";
import { Role } from "@/app/constants";

export const DriverRoutes = Router();

DriverRoutes.post(
  "/register",
  validateZodRequest(createDriverZodSchema),
  DriverControllers.createDriver
);

DriverRoutes.post(
  "/login",
  validateZodRequest(loginZodSchema),
  addUserRole(Role.DRIVER),
  LoginControllers.login
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
