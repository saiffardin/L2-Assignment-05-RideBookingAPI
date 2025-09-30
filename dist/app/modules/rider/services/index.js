"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiderServices = void 0;
const create_rider_svc_1 = require("./create-rider.svc");
const login_rider_svc_1 = require("./login-rider.svc");
exports.RiderServices = {
    createRider: create_rider_svc_1.createRider,
    loginRider: login_rider_svc_1.loginRider,
};
