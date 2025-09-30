"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripServices = void 0;
const accept_trip_svc_1 = require("./accept-trip.svc");
const available_trip_list_svc_1 = require("./available-trip-list.svc");
const cancel_trip_svc_1 = require("./cancel-trip-svc");
const earnings_history_svc_1 = require("./earnings-history.svc");
const request_trip_svc_1 = require("./request-trip.svc");
const rider_history_svc_1 = require("./rider-history.svc");
const update_trip_status_svc_1 = require("./update-trip-status.svc");
exports.TripServices = {
    requestTrip: request_trip_svc_1.requestTrip,
    acceptTrip: accept_trip_svc_1.acceptTrip,
    updateTripStatus: update_trip_status_svc_1.updateTripStatus,
    cancelTrip: cancel_trip_svc_1.cancelTrip,
    riderHistory: rider_history_svc_1.riderHistory,
    availableTripList: available_trip_list_svc_1.availableTripList,
    earningsHistory: earnings_history_svc_1.earningsHistory,
};
