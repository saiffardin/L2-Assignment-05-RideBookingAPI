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
exports.requestTrip = void 0;
const trip_model_1 = require("../trip.model");
const rider_model_1 = require("../../rider/rider.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const constants_1 = require("@/app/constants");
const AppError_1 = __importDefault(require("@/app/error-helpers/AppError"));
const location_service_1 = require("../../location/location.service");
const requestTrip = (riderId, pickup, destination) => __awaiter(void 0, void 0, void 0, function* () {
    const rider = yield rider_model_1.Rider.findById(riderId);
    if (!rider) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Rider not found.");
    }
    validateRiderTripRequest(rider);
    const fare = yield location_service_1.LocationServices.calculateFare(pickup, destination);
    const trip = yield trip_model_1.Trip.create({
        riderId: rider._id,
        pickup,
        destination,
        fare,
        status: constants_1.TripStatus.SEARCHING_DRIVER,
        history: [
            {
                status: constants_1.TripStatus.SEARCHING_DRIVER,
                timestamp: new Date(),
                actorRole: constants_1.Role.RIDER,
                actorId: rider._id,
            },
        ],
    });
    rider.status = constants_1.UserStatus.ON_TRIP;
    yield rider.save();
    return trip;
});
exports.requestTrip = requestTrip;
const validateRiderTripRequest = (rider) => {
    if (!(rider === null || rider === void 0 ? void 0 : rider.status) || (rider === null || rider === void 0 ? void 0 : rider.status) === constants_1.UserStatus.OFFLINE) {
        const msg = `Rider status invalid (${rider === null || rider === void 0 ? void 0 : rider.status}).`;
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, msg);
    }
    if ((rider === null || rider === void 0 ? void 0 : rider.status) === constants_1.UserStatus.ON_TRIP) {
        const msg = "A rider can request only one trip at a time.";
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, msg);
    }
};
