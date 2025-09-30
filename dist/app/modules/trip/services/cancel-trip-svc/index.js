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
exports.cancelTrip = void 0;
const mongoose_1 = require("mongoose");
const trip_model_1 = require("../../trip.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("@/app/error-helpers/AppError"));
const constants_1 = require("@/app/constants");
const updateRiderTripStatus_1 = require("./updateRiderTripStatus");
const updateDriverTripStatus_1 = require("./updateDriverTripStatus");
const check_validations_1 = require("./check-validations");
const cancelTrip = (values) => __awaiter(void 0, void 0, void 0, function* () {
    const { tripId, actorRole, actorId } = values;
    const isReqFromRider = actorRole === constants_1.Role.RIDER;
    const isReqFromDriver = actorRole === constants_1.Role.DRIVER;
    const trip = yield trip_model_1.Trip.findById(tripId);
    if (!trip) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Trip not found.");
    }
    (0, check_validations_1.checkValidations)({
        trip,
        actorId,
        isReqFromRider,
        isReqFromDriver,
    });
    yield (0, updateRiderTripStatus_1.updateRiderTripStatus)(trip, isReqFromRider);
    yield (0, updateDriverTripStatus_1.updateDriverTripStatus)(trip.driverId);
    if (isReqFromRider) {
        trip.status = constants_1.TripStatus.CANCELLED;
        trip.cancelledAt = new Date();
    }
    else if (isReqFromDriver) {
        trip.status = constants_1.TripStatus.SEARCHING_DRIVER;
    }
    trip.history.push({
        status: trip.status,
        timestamp: new Date(),
        actorRole,
        actorId: actorId ? new mongoose_1.Types.ObjectId(actorId) : undefined,
    });
    yield trip.save();
    return trip;
});
exports.cancelTrip = cancelTrip;
