"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserTokens = void 0;
const jwt_1 = require("../jwt");
const config_1 = require("../../config");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../error-helpers/AppError"));
const createUserTokens = (payload) => {
    if (!payload.userId || !payload.email || !payload.role) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Missing User Info.");
    }
    const accessToken = (0, jwt_1.generateToken)(payload, config_1.envVars.JWT_ACCESS_SECRET, config_1.envVars.JWT_ACCESS_EXPIRES);
    const refreshToken = (0, jwt_1.generateToken)(payload, config_1.envVars.JWT_REFRESH_SECRET, config_1.envVars.JWT_REFRESH_EXPIRES);
    return {
        accessToken,
        refreshToken,
    };
};
exports.createUserTokens = createUserTokens;
