"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTripStatus = void 0;
const constants_1 = require("../../../constants");
const trip_model_1 = require("../trip.model");
const AppError_1 = __importDefault(require("../../../error-helpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const driver_model_1 = require("../../driver/driver.model");
const mongoose_1 = require("mongoose");
const rider_model_1 = require("../../rider/rider.model");
const updateTripStatus = (values) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { tripId, newStatus, actorRole, actorId } = values;
    const trip = yield trip_model_1.Trip.findById(tripId);
    if (!trip) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Trip not found.");
    }
    const allowed = constants_1.allowedTransitions[trip.status] || [];
    if (!allowed.includes(newStatus)) {
        const msg = `Invalid status transition from ${trip.status} to ${newStatus}.`;
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, msg);
    }
    if (((_a = trip.driverId) === null || _a === void 0 ? void 0 : _a.toString()) !== actorId) {
        const msg = `Another driver is assigned to this trip.`;
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, msg);
    }
    const now = new Date();
    trip.status = newStatus;
    if (newStatus === constants_1.TripStatus.TRIP_STARTED) {
        trip.pickedUpAt = now;
    }
    if (newStatus === constants_1.TripStatus.TRIP_COMPLETED) {
        trip.completedAt = now;
        yield updateDriverEarnings(trip);
        yield updateRiderStatus(trip);
    }
    trip.history.push({
        status: newStatus,
        timestamp: now,
        actorRole,
        actorId: actorId ? new mongoose_1.Types.ObjectId(actorId) : undefined,
    });
    yield trip.save();
    return trip;
});
exports.updateTripStatus = updateTripStatus;
const updateDriverEarnings = (trip) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield driver_model_1.Driver.findById(trip.driverId);
    if (!driver) {
        const msg = "Data corrupt. Driver not found.";
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, msg);
    }
    if (!trip.fare) {
        const msg = "Data corrupt. Trip fare not found.";
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, msg);
    }
    driver.status = constants_1.UserStatus.ONLINE;
    driver.earnings.totalIncome += trip.fare;
    driver.earnings.totalTrips += 1;
    yield driver.save();
});
const updateRiderStatus = (trip) => __awaiter(void 0, void 0, void 0, function* () {
    yield rider_model_1.Rider.findByIdAndUpdate(trip.riderId, {
        $set: { status: constants_1.UserStatus.ONLINE },
    });
});
