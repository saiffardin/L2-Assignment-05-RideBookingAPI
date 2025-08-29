"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDriver = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("@/app/error-helpers/AppError"));
const driver_model_1 = require("../driver.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = require("@/app/config");
const createDriver = async (payload) => {
    const { email, password, ...rest } = payload;
    const isUserExist = await driver_model_1.Driver.findOne({ email });
    if (isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Driver Already Exist.");
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, Number(config_1.envVars.BCRYPT_SALT_ROUND));
    // const isPasswordMatched = await bcryptjs.compare(
    //   password as string,
    //   hashedPassword
    // );
    const user = await driver_model_1.Driver.create({
        email,
        password: hashedPassword,
        ...rest,
    });
    return user;
};
exports.createDriver = createDriver;
