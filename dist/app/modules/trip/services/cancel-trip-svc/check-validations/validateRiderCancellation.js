"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRiderCancellation = void 0;
const constants_1 = require("@/app/constants");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("@/app/error-helpers/AppError"));
const CANCEL_WINDOW_SECONDS = parseInt(process.env.CANCEL_WINDOW_SECONDS || "60", 10);
const validateRiderCancellation = (trip, actorId) => {
    if (!trip.riderId) {
        const msg = "Data corrupt. Rider ID is missing from the trip.";
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, msg);
    }
    if (String(trip.riderId) !== actorId) {
        const msg = "A rider cannot cancel another rider’s trip.";
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, msg);
    }
    switch (trip.status) {
        /** rider is allowed to cancel the trip in this stage */
        case constants_1.TripStatus.SEARCHING_DRIVER: {
            break;
        }
        /**
         * A rider can cancel the trip on this stage only if
         * the cancellation occurs within the grace period.
         */
        case constants_1.TripStatus.DRIVER_ASSIGNED: {
            if (!trip.acceptedAt) {
                const msg = "Trip not properly accepted.";
                throw new AppError_1.default(http_status_codes_1.default.CONFLICT, msg);
            }
            const diff = (Date.now() - trip.acceptedAt.getTime()) / 1000;
            if (diff > CANCEL_WINDOW_SECONDS) {
                const msg = `Can't cancel a trip after ${CANCEL_WINDOW_SECONDS} seconds has passed.`;
                throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, msg);
            }
            break;
        }
        /**
         * A rider can only cancel a trip if the "trip_status" is
         * either SEARCHING_DRIVER or DRIVER_ASSIGNED
         */
        default: {
            const msg = `Rider cannot cancel at this (${trip.status}) stage.`;
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, msg);
        }
    }
};
exports.validateRiderCancellation = validateRiderCancellation;
