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
exports.checkAuth = void 0;
const config_1 = require("../config");
const constants_1 = require("../constants");
const jwt_1 = require("../utils/jwt");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../error-helpers/AppError"));
const checkAccountStatus_1 = require("../utils/checkAccountStatus");
const checkAuth = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bearerToken = req.headers.authorization;
        const accessToken = bearerToken === null || bearerToken === void 0 ? void 0 : bearerToken.split(" ")[1];
        const verifiedToken = (0, jwt_1.verifyToken)(accessToken, config_1.envVars.JWT_ACCESS_SECRET);
        if (!authRoles.includes(verifiedToken.role)) {
            const msg = `You (${verifiedToken.role}) are not permitted for this route.`;
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, msg);
        }
        const isCheckAccount = !constants_1.excludedPaths.includes(req.originalUrl);
        console.log("req.originalUrl:", req.originalUrl);
        console.log("req.path:", req.path);
        console.log("excludedPaths:", constants_1.excludedPaths);
        console.log("isCheckAccount:", isCheckAccount);
        if (isCheckAccount) {
            yield (0, checkAccountStatus_1.checkAccountStatus)(verifiedToken.userId, verifiedToken.role);
        }
        req.user = verifiedToken;
        next();
    }
    catch (error) {
        console.error("jwt error", error);
        next(error);
    }
});
exports.checkAuth = checkAuth;
