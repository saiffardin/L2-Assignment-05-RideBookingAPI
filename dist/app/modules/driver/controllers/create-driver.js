"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDriver = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const catchAsync_1 = require("@/app/utils/catchAsync");
const sendResponse_1 = require("@/app/utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const services_1 = require("../services");
exports.createDriver = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const driver = await services_1.DriverService.createDriver(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Driver Created Successfully",
        data: driver,
    });
});
