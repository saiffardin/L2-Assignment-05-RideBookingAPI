"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCurrentTrip = void 0;
const constants_1 = require("../../../../../constants");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../../../../error-helpers/AppError"));
const validateCurrentTrip = (trip) => {
    const invalidStages = [
        constants_1.TripStatus.OFFLINE,
        constants_1.TripStatus.TRIP_COMPLETED,
        constants_1.TripStatus.TRIP_STARTED,
        constants_1.TripStatus.CANCELLED,
    ];
    if (invalidStages.includes(trip.status)) {
        const msg = `This trip can not be cancelled. It's already in ${trip.status} stage.`;
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, msg);
    }
};
exports.validateCurrentTrip = validateCurrentTrip;
