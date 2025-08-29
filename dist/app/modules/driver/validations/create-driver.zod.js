"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDriverZodSchema = exports.vehicleInfoSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("@/app/constants");
exports.vehicleInfoSchema = zod_1.z.object({
    type: zod_1.z.nativeEnum(constants_1.VehicleType),
    numberPlate: zod_1.z
        .string()
        .regex(/^[a-zA-Z]+(-[a-zA-Z]+)*-\d{2}-\d{1,4}$/, "Invalid Bangladeshi number plate format"),
});
exports.createDriverZodSchema = zod_1.z.object({
    name: zod_1.z
        .string({ invalid_type_error: "Name must be string." })
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." }),
    email: zod_1.z
        .string({ invalid_type_error: "Email must be string." })
        .email({ message: "Invalid email address format." })
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(100, { message: "Email cannot exceed 100 characters." }),
    password: zod_1.z
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
    }),
    drivingLicense: zod_1.z
        .string()
        .regex(/^[a-zA-Z]{2}-\d{4}-\d{1,6}$/, "Invalid Bangladeshi driving license format"),
    vehicleInfo: exports.vehicleInfoSchema,
    phone: zod_1.z
        .string({ invalid_type_error: "Phone Number must be string." })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
        .optional(),
    picture: zod_1.z.string().url("Invalid URL").optional(),
    isDeleted: zod_1.z.boolean().default(false),
    userStatus: zod_1.z.nativeEnum(constants_1.UserStatus).default(constants_1.UserStatus.ACTIVE),
    isVerified: zod_1.z.boolean().default(false),
    tripStatus: zod_1.z.nativeEnum(constants_1.DriverStatus).default(constants_1.DriverStatus.ONLINE),
});
