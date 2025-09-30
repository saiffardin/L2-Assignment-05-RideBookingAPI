"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiderControllers = void 0;
const create_rider_1 = require("./create-rider");
const login_rider_1 = require("./login-rider");
const rider_history_1 = require("./rider-history");
exports.RiderControllers = {
    createRider: create_rider_1.createRider,
    loginRider: login_rider_1.loginRider,
    riderHistory: rider_history_1.riderHistory,
};
