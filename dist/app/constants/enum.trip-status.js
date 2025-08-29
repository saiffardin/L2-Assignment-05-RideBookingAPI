"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripStatus = void 0;
var TripStatus;
(function (TripStatus) {
    TripStatus["OFFLINE"] = "OFFLINE";
    TripStatus["SEARCHING_DRIVER"] = "SEARCHING_DRIVER";
    TripStatus["DRIVER_ASSIGNED"] = "DRIVER_ASSIGNED";
    TripStatus["TRIP_STARTED"] = "TRIP_STARTED";
    TripStatus["TRIP_COMPLETED"] = "TRIP_COMPLETED";
    TripStatus["PENDING_PAYMENT"] = "PENDING_PAYMENT";
    TripStatus["PAYMENT_COMPLETED"] = "PAYMENT_COMPLETED";
    TripStatus["CANCELLED_BY_DRIVER"] = "CANCELLED_BY_DRIVER";
    TripStatus["CANCELLED_BY_RIDER"] = "CANCELLED_BY_RIDER";
    TripStatus["NO_DRIVER_FOUND"] = "NO_DRIVER_FOUND";
})(TripStatus || (exports.TripStatus = TripStatus = {}));
