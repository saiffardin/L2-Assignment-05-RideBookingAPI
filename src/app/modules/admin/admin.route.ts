import { Router } from "express";
import { AdminControllers } from "./admin.controller";
import {
  loginAdminZodSchema,
  userRiderDriverZodSchema,
} from "./admin.validation";
import { validateZodRequest } from "../../middlewares/validateZodRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../constants";

export const AdminRoutes = Router();

AdminRoutes.post(
  "/login",
  validateZodRequest(loginAdminZodSchema),
  AdminControllers.loginAdmin
);

AdminRoutes.get(
  "/drivers",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminControllers.getAllDrivers
);

AdminRoutes.get(
  "/riders",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminControllers.getAllRiders
);

AdminRoutes.get(
  "/trips",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminControllers.getAllTrips
);

AdminRoutes.patch(
  "/drivers/:driverId/approve",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminControllers.approveDriver
);

AdminRoutes.patch(
  "/drivers/:driverId/suspend",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminControllers.suspendDriver
);

AdminRoutes.patch(
  "/users/:userId/block",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateZodRequest(userRiderDriverZodSchema),
  AdminControllers.blockUser
);

AdminRoutes.patch(
  "/users/:userId/unblock",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateZodRequest(userRiderDriverZodSchema),
  AdminControllers.unblockUser
);
