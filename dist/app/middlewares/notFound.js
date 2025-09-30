"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const sendResponse_1 = require("../utils/sendResponse");
const notFound = (req, res) => {
    (0, sendResponse_1.sendResponse)(res, {
        success: false,
        statusCode: http_status_codes_1.default.NOT_FOUND,
        message: "Route Not Found",
        data: null,
    });
};
exports.default = notFound;
