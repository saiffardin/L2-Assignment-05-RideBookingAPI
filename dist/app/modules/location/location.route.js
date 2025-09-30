"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationRoutes = void 0;
const express_1 = require("express");
const location_controller_1 = require("./location.controller");
exports.LocationRoutes = (0, express_1.Router)();
exports.LocationRoutes.post("/seed", location_controller_1.LocationControllers.seedLocations);
