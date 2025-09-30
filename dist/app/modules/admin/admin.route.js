"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const validateZodRequest_1 = require("../../middlewares/validateZodRequest");
exports.AdminRoutes = (0, express_1.Router)();
exports.AdminRoutes.post("/login", (0, validateZodRequest_1.validateZodRequest)(admin_validation_1.loginAdminZodSchema), admin_controller_1.AdminControllers.loginAdmin);
