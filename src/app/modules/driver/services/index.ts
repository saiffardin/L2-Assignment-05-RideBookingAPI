import { createDriver } from "./create-driver.svc";
import { earningsHistory } from "./earnings-history.svc";
import { loginDriver } from "./login-driver.svc";
import { setAvailability } from "./set-availability.svc";

export const DriverServices = {
  createDriver,
  loginDriver,
  setAvailability,
  earningsHistory,
};
