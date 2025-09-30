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
exports.loginRider = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const rider_model_1 = require("../rider.model");
const constants_1 = require("../../../constants");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../../error-helpers/AppError"));
const user_tokens_1 = require("../../../utils/user-tokens");
const loginRider = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield rider_model_1.Rider.findOne({ email });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Rider does not exist. Create account first.");
    }
    const isPasswordMatched = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Wrong password.");
    }
    const tokens = (0, user_tokens_1.createUserTokens)({
        userId: user._id,
        email,
        role: constants_1.Role.RIDER,
    });
    return tokens;
});
exports.loginRider = loginRider;
