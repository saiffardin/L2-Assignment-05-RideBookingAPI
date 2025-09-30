"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const config_1 = require("../config");
const getError = (error) => {
    if (!error)
        return {};
    return {
        error: error,
        stack: config_1.envVars.NODE_ENV === "development" ? error === null || error === void 0 ? void 0 : error.stack : null,
    };
};
const sendResponse = (res, resJSON) => {
    res.status(resJSON.statusCode).json(Object.assign({ success: resJSON.success, message: resJSON.message, meta: resJSON.meta, data: resJSON.data }, getError(resJSON.error)));
};
exports.sendResponse = sendResponse;
