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
exports.LocationServices = void 0;
const location_model_1 = require("./location.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("@/app/error-helpers/AppError"));
const calculateFare = (pickUp, dest) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const locArr = yield location_model_1.Location.find({ name: pickUp });
    if (!locArr || locArr.length === 0) {
        const msg = "Pick-up location not found.";
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, msg);
    }
    const destDB = (_b = (_a = locArr === null || locArr === void 0 ? void 0 : locArr[0]) === null || _a === void 0 ? void 0 : _a.fares) === null || _b === void 0 ? void 0 : _b.find((item) => (item === null || item === void 0 ? void 0 : item.destination) === dest);
    return (_c = destDB === null || destDB === void 0 ? void 0 : destDB.fare) !== null && _c !== void 0 ? _c : 0;
});
exports.LocationServices = {
    calculateFare,
};
