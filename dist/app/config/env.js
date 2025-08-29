"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
const requiredEnvVars = [
    "NODE_ENV",
    "PORT",
    "DATABASE_URL",
    "JWT_ACCESS_SECRET",
    "JWT_ACCESS_EXPIRES",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_EXPIRES",
    "BCRYPT_SALT_ROUND",
    // "SUPER_ADMIN_EMAIL",
    // "SUPER_ADMIN_PASSWORD",
    // "GOOGLE_CLIENT_SECRET",
    // "GOOGLE_CLIENT_ID",
    // "GOOGLE_CALLBACK_URL",
    // "EXPRESS_SESSION_SECRET",
    // "FRONTEND_URL",
];
const loadEnv = () => {
    let envVars = {};
    requiredEnvVars.forEach((key) => {
        if (!process.env?.[key]) {
            throw new Error(`Missing required ENV variable : ${key}`);
        }
        envVars = {
            ...envVars,
            [key]: process.env?.[key],
        };
    });
    return envVars;
};
exports.envVars = loadEnv();
