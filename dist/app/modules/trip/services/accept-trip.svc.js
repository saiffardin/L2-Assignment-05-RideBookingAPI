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
exports.acceptTrip = void 0;
const trip_model_1 = require("../trip.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const driver_model_1 = require("../../driver/driver.model");
const AppError_1 = __importDefault(require("@/app/error-helpers/AppError"));
const constants_1 = require("@/app/constants");
const acceptTrip = (tripId, driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield trip_model_1.Trip.findById(tripId);
    if (!trip) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Trip not found.");
    }
    if (trip.driverId) {
        const msg = "A driver has already been assigned to this trip.";
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, msg);
    }
    if (trip.status !== constants_1.TripStatus.SEARCHING_DRIVER) {
        const msg = "Cannot accept non-requested trip.";
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, msg);
    }
    const driver = yield validateAndUpdateDriver(driverId);
    trip.driverId = driver.id;
    trip.status = constants_1.TripStatus.DRIVER_ASSIGNED;
    trip.acceptedAt = new Date();
    trip.history.push({
        status: constants_1.TripStatus.DRIVER_ASSIGNED,
        timestamp: new Date(),
        actorRole: constants_1.Role.DRIVER,
        actorId: driver.id,
    });
    yield trip.save();
    return trip;
});
exports.acceptTrip = acceptTrip;
const validateAndUpdateDriver = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield driver_model_1.Driver.findById(driverId);
    if (!driver) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Driver doesn't exist.");
    }
    if (driver.status === constants_1.UserStatus.ON_TRIP) {
        const msg = "A driver can accept only one trip at a time.";
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, msg);
    }
    driver.status = constants_1.UserStatus.ON_TRIP;
    yield driver.save();
    return driver;
});
