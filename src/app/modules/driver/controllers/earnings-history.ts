/* eslint-disable @typescript-eslint/no-unused-vars */

import httpStatusCodes from "http-status-codes";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { type Response, type Request, type NextFunction } from "express";
import { DriverServices } from "../services";

export const earningsHistory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const driverId = req.user.userId as string;
    const earnings = await DriverServices.earningsHistory(driverId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: "Fetched Driver's Earnings History Successfully.",
      data: earnings,
    });
  }
);
