import { Router } from "express";
import { DriverRoutes } from "../modules/driver/driver.route";
import { RiderRoutes } from "../modules/rider/rider.route";
import { AdminRoutes } from "../modules/admin/admin.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/driver",
    route: DriverRoutes,
  },
  {
    path: "/rider",
    route: RiderRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((element) => {
  router.use(element.path, element.route);
});
