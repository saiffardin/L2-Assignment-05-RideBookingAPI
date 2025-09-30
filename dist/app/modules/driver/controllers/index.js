"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverControllers = void 0;
const create_driver_1 = require("./create-driver");
const earnings_history_1 = require("./earnings-history");
const login_driver_1 = require("./login-driver");
const set_availability_1 = require("./set-availability");
exports.DriverControllers = {
    createDriver: create_driver_1.createDriver,
    loginDriver: login_driver_1.loginDriver,
    setAvailability: set_availability_1.setAvailability,
    earningsHistory: earnings_history_1.earningsHistory,
};
