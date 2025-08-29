"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverRoutes = void 0;
const express_1 = require("express");
const controllers_1 = require("./controllers");
const validations_1 = require("./validations");
const validateZodRequest_1 = require("@/app/middlewares/validateZodRequest");
exports.DriverRoutes = (0, express_1.Router)();
exports.DriverRoutes.post("/register", (0, validateZodRequest_1.validateZodRequest)(validations_1.createDriverZodSchema), controllers_1.DriverControllers.createDriver);
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
