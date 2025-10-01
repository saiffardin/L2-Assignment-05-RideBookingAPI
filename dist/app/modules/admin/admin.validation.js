"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRiderDriverZodSchema = exports.loginAdminZodSchema = void 0;
const zod_1 = require("zod");
const common_zod_validations_1 = require("../../utils/common-zod-validations");
const constants_1 = require("../../constants");
exports.loginAdminZodSchema = zod_1.z.object({
    email: common_zod_validations_1.emailZodValidation,
    password: common_zod_validations_1.passwordZodValidation,
});
exports.userRiderDriverZodSchema = zod_1.z.object({
    role: zod_1.z.enum([constants_1.Role.RIDER, constants_1.Role.DRIVER]),
});
