/* eslint-disable @typescript-eslint/no-unused-vars */
import { catchAsync } from "@/app/utils/catchAsync";
import { sendResponse } from "@/app/utils/sendResponse";
import { type Response, type Request, type NextFunction } from "express";
import httpStatusCodes from "http-status-codes";
import { DriverServices } from "../services";

export const createDriver = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const driver = await DriverServices.createDriver(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.CREATED,
      message: "Driver Created Successfully",
      data: driver,
    });
  }
);
