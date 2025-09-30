"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdminZodSchema = void 0;
const zod_1 = require("zod");
const common_zod_validations_1 = require("../../utils/common-zod-validations");
exports.loginAdminZodSchema = zod_1.z.object({
    email: common_zod_validations_1.emailZodValidation,
    password: common_zod_validations_1.passwordZodValidation,
});
