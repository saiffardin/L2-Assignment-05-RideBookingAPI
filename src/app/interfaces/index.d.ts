import { CustomJwtPayload } from "../utils/jwt/types";

declare global {
  namespace Express {
    interface Request {
      user: CustomJwtPayload;
    }
  }
}
