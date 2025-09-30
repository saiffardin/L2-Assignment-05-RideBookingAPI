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
exports.AdminServices = exports.loginAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const admin_model_1 = require("./admin.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("@/app/error-helpers/AppError"));
const user_tokens_1 = require("@/app/utils/user-tokens");
const loginAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield admin_model_1.Admin.findOne({ email });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Admin / Super-admin does not exist.");
    }
    const isPasswordMatched = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Wrong password.");
    }
    const tokens = (0, user_tokens_1.createUserTokens)({
        userId: user._id,
        email,
        role: user.role,
    });
    return Object.assign(Object.assign({}, tokens), { role: user.role });
});
exports.loginAdmin = loginAdmin;
exports.AdminServices = { loginAdmin: exports.loginAdmin };
