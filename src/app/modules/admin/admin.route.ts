import { Router } from "express";
import { AdminControllers } from "./admin.controller";
import { loginAdminZodSchema } from "./admin.validation";
import { validateZodRequest } from "../../middlewares/validateZodRequest";

export const AdminRoutes = Router();

AdminRoutes.post(
  "/login",
  validateZodRequest(loginAdminZodSchema),
  AdminControllers.loginAdmin
);
