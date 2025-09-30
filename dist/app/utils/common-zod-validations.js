"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAccountZodValidation = exports.isDeletedZodValidation = exports.pictureZodValidation = exports.phoneZodValidation = exports.passwordZodValidation = exports.emailZodValidation = exports.nameZodValidation = void 0;
const zod_1 = require("zod");
const constants_1 = require("../constants");
exports.nameZodValidation = zod_1.z
    .string({ invalid_type_error: "Name must be string." })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." });
exports.emailZodValidation = zod_1.z
    .string({ invalid_type_error: "Email must be string." })
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email cannot exceed 100 characters." });
exports.passwordZodValidation = zod_1.z
    .string({ invalid_type_error: "Password must be string." })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
    message: "Password must contain at least 1 uppercase letter.",
})
    .regex(/^(?=.*[!@#$%^&*])/, {
    message: "Password must contain at least 1 special character.",
})
    .regex(/^(?=.*\d)/, {
    message: "Password must contain at least 1 number.",
});
exports.phoneZodValidation = zod_1.z
    .string({ invalid_type_error: "Phone Number must be string." })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
    message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
})
    .optional();
exports.pictureZodValidation = zod_1.z.string().url("Invalid URL").optional();
exports.isDeletedZodValidation = zod_1.z.boolean().default(false);
exports.userAccountZodValidation = zod_1.z
    .nativeEnum(constants_1.UserAccount)
    .default(constants_1.UserAccount.ACTIVE);
