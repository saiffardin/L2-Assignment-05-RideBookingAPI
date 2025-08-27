import { Router } from "express";
import { DriverRoutes } from "../modules/driver/driver.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/driver",
    route: DriverRoutes,
  },
];

moduleRoutes.forEach((element) => {
  router.use(element.path, element.route);
});
