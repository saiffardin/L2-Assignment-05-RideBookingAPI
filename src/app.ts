import express, {
  type Application,
  type Request,
  type Response,
} from "express";

const app: Application = express();

app.use([express.json(), express.urlencoded({ extended: true })]);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Welcome to Ride Booking API.",
    data: null,
  });
});

export default app;
