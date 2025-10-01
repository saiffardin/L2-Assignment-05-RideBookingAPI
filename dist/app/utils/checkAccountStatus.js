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
exports.checkAccountStatus = void 0;
const constants_1 = require("../constants");
const driver_model_1 = require("../modules/driver/driver.model");
const rider_model_1 = require("../modules/rider/rider.model");
const AppError_1 = __importDefault(require("../error-helpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const checkAccountStatus = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    if (role === constants_1.Role.ADMIN || role === constants_1.Role.SUPER_ADMIN)
        return; // saif :: TODO
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const model = role === constants_1.Role.DRIVER ? driver_model_1.Driver : rider_model_1.Rider;
    const user = yield model.findById(userId);
    if (!user) {
        const msg = `User not found in this (${role}) role.`;
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, msg);
    }
    if (user === null || user === void 0 ? void 0 : user.isDeleted) {
        const msg = `${role} is deleted.`;
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, msg);
    }
    if ((user === null || user === void 0 ? void 0 : user.status) === constants_1.UserStatus.OFFLINE) {
        const msg = `${role} is offline.`;
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, msg);
    }
    const validArr = [
        constants_1.UserAccount.ACTIVE,
        constants_1.UserAccount.UNBLOCKED,
        constants_1.UserAccount.APPROVED,
    ];
    const isAccountValid = validArr.includes(user === null || user === void 0 ? void 0 : user.accountStatus);
    if (!isAccountValid) {
        const msg = `${role} account is ${user === null || user === void 0 ? void 0 : user.accountStatus}`;
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, msg);
    }
});
exports.checkAccountStatus = checkAccountStatus;
