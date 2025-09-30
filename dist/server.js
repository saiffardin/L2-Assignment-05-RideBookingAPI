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
/* eslint-disable no-console */
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./app/config");
const seedSuperAdmin_1 = require("./app/utils/seedSuperAdmin");
let server;
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { DATABASE_URL, PORT } = config_1.envVars;
            yield mongoose_1.default.connect(DATABASE_URL);
            console.log("--------------------------------");
            console.log("Mongoose Connected at:", DATABASE_URL);
            server = app_1.default.listen(PORT, () => {
                console.log(`Server Running on port ${PORT} `);
            });
        }
        catch (error) {
            console.log("Failed to connect Mongoose.");
            console.error(error);
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield bootstrap();
    yield (0, seedSuperAdmin_1.seedSuperAdmin)();
}))();
process.on("unhandledRejection", (reason, promise) => {
    console.error(":::::::Unhandled Rejection at:", promise, "reason:", reason);
    // Optionally exit process or log error
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("uncaughtException", (reason, promise) => {
    console.error(":::::::UncaughtException at:", promise, "reason:", reason);
    // Optionally exit process or log error
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("SIGTERM", () => {
    console.error(":::::::SIGTERM at:");
    // Optionally exit process or log error
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
