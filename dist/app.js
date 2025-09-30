"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./app/routes");
const commonMiddlewares_1 = require("./app/middlewares/commonMiddlewares");
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const app = (0, express_1.default)();
app.use(commonMiddlewares_1.commonMiddlewares);
app.use("/api/v1", routes_1.router);
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Welcome to Ride Booking API.",
        data: null,
    });
});
/**
 * when you pass 4 params
 * node treats that function as GLOBAL ERROR HANDLER
 */
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.default);
exports.default = app;
