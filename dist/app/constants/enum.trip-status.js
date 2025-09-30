"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedTransitions = exports.TripStatus = void 0;
var TripStatus;
(function (TripStatus) {
    TripStatus["OFFLINE"] = "OFFLINE";
    TripStatus["SEARCHING_DRIVER"] = "SEARCHING_DRIVER";
    TripStatus["DRIVER_ASSIGNED"] = "DRIVER_ASSIGNED";
    TripStatus["TRIP_STARTED"] = "TRIP_STARTED";
    TripStatus["TRIP_COMPLETED"] = "TRIP_COMPLETED";
    TripStatus["CANCELLED"] = "CANCELLED";
})(TripStatus || (exports.TripStatus = TripStatus = {}));
exports.allowedTransitions = {
    [TripStatus.OFFLINE]: [TripStatus.SEARCHING_DRIVER],
    [TripStatus.SEARCHING_DRIVER]: [
        TripStatus.DRIVER_ASSIGNED,
        TripStatus.CANCELLED,
    ],
    [TripStatus.DRIVER_ASSIGNED]: [TripStatus.TRIP_STARTED, TripStatus.CANCELLED],
    [TripStatus.TRIP_STARTED]: [TripStatus.TRIP_COMPLETED],
    [TripStatus.TRIP_COMPLETED]: [],
    [TripStatus.CANCELLED]: [],
};
