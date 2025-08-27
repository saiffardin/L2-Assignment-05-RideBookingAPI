import { Router } from "express";
import { DriverControllers } from "./controllers";
// import { Role } from "./constants/enums";
// import { UserControllers } from "./controllers";
// import { checkAuth } from "@/app/middlewares/checkAuth";
// import { validateRequest } from "@/app/middlewares/validateRequest";
// import { createUserZodSchema, updateUserZodSchema } from "./validations";

export const DriverRoutes = Router();

DriverRoutes.post(
  "/create",
  // validateRequest(createUserZodSchema),
  DriverControllers.createDriver
);

// UserRoutes.get(
//   "/all-users",
//   checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
//   UserControllers.getAllUsers
// );

// UserRoutes.patch(
//   "/:userId",
//   checkAuth(...Object.values(Role)),
//   validateRequest(updateUserZodSchema),
//   UserControllers.updateUser
// );
