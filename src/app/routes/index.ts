import { Router } from "express";
import { DriverRoutes } from "../modules/driver/driver.route";
import { RiderRoutes } from "../modules/rider/rider.route";

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
];

moduleRoutes.forEach((element) => {
  router.use(element.path, element.route);
});
