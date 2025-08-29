"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonMiddlewares = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
exports.commonMiddlewares = [
    (0, cors_1.default)(),
    express_1.default.json(),
    express_1.default.urlencoded({ extended: true }),
    (0, cookie_parser_1.default)(),
];
