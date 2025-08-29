import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { router } from "./app/routes";
import { commonMiddlewares } from "./app/middlewares/commonMiddlewares";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

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

/**
 * when you pass 4 params
 * node treats that function as GLOBAL ERROR HANDLER
 */
app.use(globalErrorHandler);

app.use(notFound);

export default app;
