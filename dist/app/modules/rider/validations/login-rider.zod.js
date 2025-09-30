"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRiderZodSchema = void 0;
const zod_1 = require("zod");
const common_zod_validations_1 = require("../../../utils/common-zod-validations");
exports.loginRiderZodSchema = zod_1.z.object({
    email: common_zod_validations_1.emailZodValidation,
    password: common_zod_validations_1.passwordZodValidation,
});
