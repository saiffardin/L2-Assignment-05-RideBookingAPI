"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripControllers = void 0;
const accept_trip_1 = require("./accept-trip");
const available_trip_list_1 = require("./available-trip-list");
const cancel_trip_1 = require("./cancel-trip");
const earnings_history_1 = require("./earnings-history");
const request_trip_1 = require("./request-trip");
const rider_history_1 = require("./rider-history");
const trip_complete_1 = require("./trip-complete");
const trip_start_1 = require("./trip-start");
exports.TripControllers = {
    requestTrip: request_trip_1.requestTrip,
    cancelTrip: cancel_trip_1.cancelTrip,
    riderHistory: rider_history_1.riderHistory,
    acceptTrip: accept_trip_1.acceptTrip,
    availableTripList: available_trip_list_1.availableTripList,
    tripStart: trip_start_1.tripStart,
    tripComplete: trip_complete_1.tripComplete,
    earningsHistory: earnings_history_1.earningsHistory,
};
