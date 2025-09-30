"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginDriver = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const constants_1 = require("@/app/constants");
const driver_model_1 = require("../driver.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("@/app/error-helpers/AppError"));
const user_tokens_1 = require("@/app/utils/user-tokens");
const loginDriver = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield driver_model_1.Driver.findOne({ email });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Driver does not exist. Create account first.");
    }
    const isPasswordMatched = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Wrong password.");
    }
    const tokens = (0, user_tokens_1.createUserTokens)({
        userId: user._id,
        email,
        role: constants_1.Role.DRIVER,
    });
    return tokens;
});
exports.loginDriver = loginDriver;
