"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../../error-helpers/AppError"));
const verifyToken = (accessToken, secret) => {
    if (!accessToken) {
        throw new AppError_1.default(403, "No JWT Received.");
    }
    const verifiedToken = jsonwebtoken_1.default.verify(accessToken, secret);
    return verifiedToken;
};
exports.verifyToken = verifyToken;
