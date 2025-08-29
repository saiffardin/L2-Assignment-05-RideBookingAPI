"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rider = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("@/app/constants");
const RiderSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    picture: { type: String },
    isDeleted: { type: Boolean, default: false },
    userStatus: {
        type: String,
        enum: Object.values(constants_1.UserStatus),
        default: constants_1.UserStatus.ACTIVE,
    },
    isVerified: { type: Boolean, default: false },
    tripStatus: {
        type: String,
        enum: Object.values(constants_1.TripStatus),
        default: constants_1.TripStatus.OFFLINE,
    },
}, { timestamps: true });
exports.Rider = (0, mongoose_1.model)("Rider", RiderSchema);
