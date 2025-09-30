"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRiderZodSchema = void 0;
const zod_1 = require("zod");
const common_zod_validations_1 = require("../../../utils/common-zod-validations");
const constants_1 = require("../../../constants");
exports.createRiderZodSchema = zod_1.z.object({
    name: common_zod_validations_1.nameZodValidation,
    email: common_zod_validations_1.emailZodValidation,
    password: common_zod_validations_1.passwordZodValidation,
    phone: common_zod_validations_1.phoneZodValidation,
    picture: common_zod_validations_1.pictureZodValidation,
    isDeleted: common_zod_validations_1.isDeletedZodValidation,
    accountStatus: common_zod_validations_1.userAccountZodValidation,
    isVerified: zod_1.z.boolean().default(false),
    status: zod_1.z.nativeEnum(constants_1.UserStatus).default(constants_1.UserStatus.OFFLINE),
});
