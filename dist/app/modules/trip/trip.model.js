"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = void 0;
const constants_1 = require("@/app/constants");
const mongoose_1 = require("mongoose");
const enum_locations_1 = require("@/app/constants/enum.locations");
const TripHistorySchema = new mongoose_1.Schema({
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    actorRole: {
        type: String,
        enum: Object.values(constants_1.Role),
    },
    actorId: mongoose_1.Schema.Types.ObjectId,
    note: String,
}, { _id: false });
const TripSchema = new mongoose_1.Schema({
    riderId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Rider",
        required: true,
        index: true,
    },
    driverId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Driver", default: null },
    pickup: {
        type: String,
        enum: Object.values(enum_locations_1.LocationName),
        required: true,
    },
    destination: {
        type: String,
        enum: Object.values(enum_locations_1.LocationName),
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: constants_1.TripStatus.SEARCHING_DRIVER,
    },
    fare: { type: Number, default: 0 },
    requestedAt: { type: Date, default: Date.now },
    acceptedAt: Date,
    pickedUpAt: Date,
    completedAt: Date,
    cancelledAt: Date,
    history: { type: [TripHistorySchema], default: [] },
});
exports.Trip = (0, mongoose_1.model)("Trip", TripSchema);
