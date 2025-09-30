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
exports.availableTripList = void 0;
const constants_1 = require("../../../constants");
const trip_model_1 = require("../trip.model");
const AppError_1 = __importDefault(require("../../../error-helpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const availableTripList = () => __awaiter(void 0, void 0, void 0, function* () {
    const trips = yield trip_model_1.Trip.find({ status: constants_1.TripStatus.SEARCHING_DRIVER }).sort({
        requestedAt: 1,
    });
    if (!trips || trips.length === 0) {
        const msg = "No rider is currently looking for a driver.";
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, msg);
    }
    return trips;
});
exports.availableTripList = availableTripList;
