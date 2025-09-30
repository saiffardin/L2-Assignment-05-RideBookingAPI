"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const constants_1 = require("../../constants");
const mongoose_1 = require("mongoose");
const AdminSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: [constants_1.Role.ADMIN, constants_1.Role.SUPER_ADMIN],
    },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });
exports.Admin = (0, mongoose_1.model)("Admin", AdminSchema);
