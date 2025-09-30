"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverServices = void 0;
const create_driver_svc_1 = require("./create-driver.svc");
const earnings_history_svc_1 = require("./earnings-history.svc");
const login_driver_svc_1 = require("./login-driver.svc");
const set_availability_svc_1 = require("./set-availability.svc");
exports.DriverServices = {
    createDriver: create_driver_svc_1.createDriver,
    loginDriver: login_driver_svc_1.loginDriver,
    setAvailability: set_availability_svc_1.setAvailability,
    earningsHistory: earnings_history_svc_1.earningsHistory,
};
