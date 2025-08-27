import { catchAsync } from "@/app/utils/catchAsync";
import { sendResponse } from "@/app/utils/sendResponse";
import { type Response, type Request, type NextFunction } from "express";
import httpStatusCodes from "http-status-codes";
import { DriverService } from "../services";

export const createDriver = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const driver = await DriverService.createDriver(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.CREATED,
      message: "Driver Created Successfully",
      data: driver,
    });
  }
);
