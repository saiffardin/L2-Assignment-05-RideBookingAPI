import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { router } from "./app/routes";
import { commonMiddlewares } from "./app/middlewares";

const app: Application = express();

app.use(commonMiddlewares);

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Welcome to Ride Booking API.",
    data: null,
  });
});

export default app;
