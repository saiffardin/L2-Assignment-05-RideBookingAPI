/* eslint-disable @typescript-eslint/no-unused-vars */
import { DriverServices } from "../services";
import httpStatusCodes from "http-status-codes";
import { catchAsync } from "@/app/utils/catchAsync";
import { sendResponse } from "@/app/utils/sendResponse";
import { type Response, type Request, type NextFunction } from "express";

export const loginDriver = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const driver = await DriverServices.loginDriver(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: "Driver Logged-in Successfully.",
      data: driver,
    });
  }
);

export const LoginControllers = { loginDriver };
