"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
const mongoose_1 = require("mongoose");
const enum_locations_1 = require("../../constants/enum.locations");
const LocationSchema = new mongoose_1.Schema({
    name: {
        type: String,
        enum: Object.values(enum_locations_1.LocationName),
        required: true,
        unique: true,
        trim: true,
    },
    description: { type: String, default: "" },
    fares: [
        {
            _id: false,
            destination: {
                type: String,
                enum: Object.values(enum_locations_1.LocationName),
                required: true,
            },
            fare: { type: Number, required: true, min: 0 },
        },
    ],
});
exports.Location = (0, mongoose_1.model)("Location", LocationSchema);
