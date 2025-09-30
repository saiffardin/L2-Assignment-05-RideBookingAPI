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
exports.renewRiderAccessToken = void 0;
const config_1 = require("@/app/config");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const constants_1 = require("@/app/constants");
const jwt_1 = require("../jwt");
const AppError_1 = __importDefault(require("@/app/error-helpers/AppError"));
const rider_model_1 = require("@/app/modules/rider/rider.model");
const validateRiderForTokenRenewal = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountStatus, isDeleted } = user;
    if (accountStatus === constants_1.UserAccount.BLOCKED ||
        accountStatus === constants_1.UserAccount.INACTIVE) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, `Rider account is ${accountStatus}.`);
    }
    if (isDeleted) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, `Rider is deleted.`);
    }
});
const renewRiderAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedRefreshToken = (0, jwt_1.verifyToken)(refreshToken, config_1.envVars.JWT_REFRESH_SECRET);
    const rider = yield rider_model_1.Rider.findOne({ email: verifiedRefreshToken.email });
    if (!rider) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Rider does not exist.");
    }
    yield validateRiderForTokenRenewal(rider);
    const jwtPayload = {
        userId: rider._id,
        email: rider.email,
        role: constants_1.Role.RIDER,
    };
    const accessToken = (0, jwt_1.generateToken)(jwtPayload, config_1.envVars.JWT_ACCESS_SECRET, config_1.envVars.JWT_ACCESS_EXPIRES);
    return accessToken;
});
exports.renewRiderAccessToken = renewRiderAccessToken;
