"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../constants");
const vehicleInfoSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: Object.values(constants_1.VehicleType),
        required: true,
    },
    numberPlate: {
        type: String,
        required: true,
    },
}, {
    versionKey: false,
    _id: false,
});
const driverSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    drivingLicense: { type: String, required: true },
    vehicleInfo: vehicleInfoSchema,
    earnings: {
        totalIncome: { type: Number, default: 0 },
        totalTrips: { type: Number, default: 0 },
    },
    phone: { type: String },
    picture: { type: String },
    isDeleted: { type: Boolean, default: false },
    accountStatus: {
        type: String,
        enum: Object.values(constants_1.UserAccount),
        default: constants_1.UserAccount.ACTIVE,
    },
    isVerified: { type: Boolean, default: false },
    status: {
        type: String,
        enum: Object.values(constants_1.UserStatus),
        default: constants_1.UserStatus.ONLINE,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Driver = (0, mongoose_1.model)("Driver", driverSchema);
