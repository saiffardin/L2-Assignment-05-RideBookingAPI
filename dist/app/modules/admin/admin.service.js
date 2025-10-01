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
const AppError_1 = __importDefault(require("../../error-helpers/AppError"));
const user_tokens_1 = require("../../utils/user-tokens");
const driver_model_1 = require("../driver/driver.model");
const rider_model_1 = require("../rider/rider.model");
const trip_model_1 = require("../trip/trip.model");
const constants_1 = require("../../constants");
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
const getAllDrivers = () => __awaiter(void 0, void 0, void 0, function* () { return yield driver_model_1.Driver.find().select("-password"); });
const getAllRiders = () => __awaiter(void 0, void 0, void 0, function* () { return yield rider_model_1.Rider.find().select("-password -__v"); });
const getAllTrips = () => __awaiter(void 0, void 0, void 0, function* () { return yield trip_model_1.Trip.find().select("-__v"); });
const approveDriver = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield driver_model_1.Driver.findByIdAndUpdate(driverId, { isVerified: true, accountStatus: constants_1.UserAccount.APPROVED }, { new: true, runValidators: true });
    if (!driver) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Driver not found.");
    }
    return driver;
});
const suspendDriver = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield driver_model_1.Driver.findByIdAndUpdate(driverId, { accountStatus: constants_1.UserAccount.SUSPEND }, { new: true, runValidators: true });
    if (!driver) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Driver not found.");
    }
    return driver;
});
const blockUser = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const model = role === constants_1.Role.DRIVER ? driver_model_1.Driver : rider_model_1.Rider;
    const user = yield model.findByIdAndUpdate(userId, { accountStatus: constants_1.UserAccount.BLOCKED }, { new: true, runValidators: true });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, `${role} not found.`);
    }
    return user;
});
const unblockUser = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const model = role === constants_1.Role.DRIVER ? driver_model_1.Driver : rider_model_1.Rider;
    const user = yield model.findByIdAndUpdate(userId, { accountStatus: constants_1.UserAccount.UNBLOCKED }, { new: true, runValidators: true });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, `${role} not found.`);
    }
    return user;
});
exports.AdminServices = {
    loginAdmin: exports.loginAdmin,
    getAllDrivers,
    getAllRiders,
    getAllTrips,
    approveDriver,
    suspendDriver,
    blockUser,
    unblockUser,
};
