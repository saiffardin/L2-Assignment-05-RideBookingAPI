"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDriverCancellation = void 0;
const constants_1 = require("@/app/constants");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("@/app/error-helpers/AppError"));
const validateDriverCancellation = (trip, actorId) => {
    if (!trip.driverId) {
        const msg = "No driver has assigned to this trip yet.";
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, msg);
    }
    if (String(trip.driverId) !== actorId) {
        const msg = "A driver cannot cancel another driver’s trip.";
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, msg);
    }
    if (trip.status !== constants_1.TripStatus.DRIVER_ASSIGNED) {
        const msg = "Driver can only cancel before trip starts.";
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, msg);
    }
};
exports.validateDriverCancellation = validateDriverCancellation;
