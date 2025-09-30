"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripRequestZodSchema = void 0;
const zod_1 = require("zod");
const enum_locations_1 = require("../../../constants/enum.locations");
exports.tripRequestZodSchema = zod_1.z.object({
    pickup: zod_1.z.nativeEnum(enum_locations_1.LocationName),
    destination: zod_1.z.nativeEnum(enum_locations_1.LocationName),
});
