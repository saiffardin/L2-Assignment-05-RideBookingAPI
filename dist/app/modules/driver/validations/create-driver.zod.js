"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDriverZodSchema = exports.vehicleInfoSchema = void 0;
const zod_1 = require("zod");
const common_zod_validations_1 = require("@/app/utils/common-zod-validations");
const constants_1 = require("@/app/constants");
exports.vehicleInfoSchema = zod_1.z.object({
    type: zod_1.z.nativeEnum(constants_1.VehicleType),
    numberPlate: zod_1.z
        .string()
        .regex(/^[a-zA-Z]+(-[a-zA-Z]+)*-\d{2}-\d{1,4}$/, "Invalid Bangladeshi number plate format"),
});
exports.createDriverZodSchema = zod_1.z.object({
    name: common_zod_validations_1.nameZodValidation,
    email: common_zod_validations_1.emailZodValidation,
    password: common_zod_validations_1.passwordZodValidation,
    phone: common_zod_validations_1.phoneZodValidation,
    picture: common_zod_validations_1.pictureZodValidation,
    isDeleted: common_zod_validations_1.isDeletedZodValidation,
    accountStatus: common_zod_validations_1.userAccountZodValidation,
    drivingLicense: zod_1.z
        .string()
        .regex(/^[a-zA-Z]{2}-\d{4}-\d{1,6}$/, "Invalid Bangladeshi driving license format"),
    vehicleInfo: exports.vehicleInfoSchema,
    isVerified: zod_1.z.boolean().default(false),
    status: zod_1.z.nativeEnum(constants_1.UserStatus).default(constants_1.UserStatus.ONLINE),
});
