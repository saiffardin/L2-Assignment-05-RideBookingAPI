/* eslint-disable @typescript-eslint/no-unused-vars */
import { catchAsync } from "@/app/utils/catchAsync";
import { sendResponse } from "@/app/utils/sendResponse";
import { type Response, type Request, type NextFunction } from "express";
import httpStatusCodes from "http-status-codes";
import { DriverService } from "../services";

export const loginDriver = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const driver = await DriverService.loginDriver(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: "Driver Logged-in Successfully.",
      data: driver,
    });
  }
);
