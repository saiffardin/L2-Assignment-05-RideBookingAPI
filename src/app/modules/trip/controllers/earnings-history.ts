/* eslint-disable @typescript-eslint/no-unused-vars */

import { TripServices } from "../services";
import httpStatusCodes from "http-status-codes";
import { catchAsync } from "@/app/utils/catchAsync";
import { sendResponse } from "@/app/utils/sendResponse";
import { type Response, type Request, type NextFunction } from "express";

export const earningsHistory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const driverId = req.user.userId as string;
    const earnings = await TripServices.earningsHistory(driverId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: "Fetched Driver's Earnings History Successfully.",
      data: earnings,
    });
  }
);
