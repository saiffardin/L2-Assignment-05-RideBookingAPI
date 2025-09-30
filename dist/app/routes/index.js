"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const driver_route_1 = require("../modules/driver/driver.route");
const rider_route_1 = require("../modules/rider/rider.route");
const admin_route_1 = require("../modules/admin/admin.route");
const trip_route_1 = require("../modules/trip/trip.route");
const location_route_1 = require("../modules/location/location.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/driver",
        route: driver_route_1.DriverRoutes,
    },
    {
        path: "/rider",
        route: rider_route_1.RiderRoutes,
    },
    {
        path: "/admin",
        route: admin_route_1.AdminRoutes,
    },
    {
        path: "/trip",
        route: trip_route_1.TripRoutes,
    },
    {
        path: "/location",
        route: location_route_1.LocationRoutes,
    },
];
moduleRoutes.forEach((element) => {
    exports.router.use(element.path, element.route);
});
