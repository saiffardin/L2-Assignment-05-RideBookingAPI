"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./app/config");
const mongoose_1 = __importDefault(require("mongoose"));
let server;
async function bootstrap() {
    try {
        const { DATABASE_URL, PORT } = config_1.envVars;
        await mongoose_1.default.connect(DATABASE_URL);
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
}
(async () => {
    await bootstrap();
    // await seedSuperAdmin();
})();
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
