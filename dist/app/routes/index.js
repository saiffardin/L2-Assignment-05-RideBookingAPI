"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const driver_route_1 = require("../modules/driver/driver.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/driver",
        route: driver_route_1.DriverRoutes,
    },
];
moduleRoutes.forEach((element) => {
    exports.router.use(element.path, element.route);
});
