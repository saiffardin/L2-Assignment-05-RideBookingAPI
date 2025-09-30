"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAvailabilityZodSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("../../../constants");
exports.setAvailabilityZodSchema = zod_1.z.object({
    status: zod_1.z.enum([constants_1.UserStatus.ONLINE, constants_1.UserStatus.OFFLINE]),
});
