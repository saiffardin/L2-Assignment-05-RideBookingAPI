"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const config_1 = require("../config");
const AppError_1 = __importDefault(require("../error-helpers/AppError"));
const handlers_1 = require("../error-helpers/handlers");
/**
 * when you pass 4 params
 * node treats that function as GLOBAL ERROR HANDLER
 */
const globalErrorHandler = (err, req, res, next) => {
    if (config_1.envVars.NODE_ENV === "development") {
        console.error(err);
    }
    let errorSources = [];
    let statusCode = 500;
    let message = "Something Went Wrong!!";
    //Duplicate error
    if (err.code === 11000) {
        const simplifiedError = (0, handlers_1.handlerDuplicateError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    // Object ID error / Cast Error
    else if (err.name === "CastError") {
        const simplifiedError = (0, handlers_1.handleCastError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    // Zod Validation Error
    else if (err.name === "ZodError") {
        const simplifiedError = (0, handlers_1.handlerZodError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    //Mongoose Validation Error
    else if (err.name === "ValidationError") {
        const simplifiedError = (0, handlers_1.handlerValidationError)(err);
        statusCode = simplifiedError.statusCode;
        errorSources = simplifiedError.errorSources;
        message = simplifiedError.message;
    }
    // throw AppError
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    // throw Error
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err: config_1.envVars.NODE_ENV === "development" ? err : null,
        stack: config_1.envVars.NODE_ENV === "development" ? err.stack : null,
    });
};
exports.globalErrorHandler = globalErrorHandler;
