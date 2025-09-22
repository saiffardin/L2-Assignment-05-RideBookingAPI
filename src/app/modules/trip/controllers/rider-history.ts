/* eslint-disable @typescript-eslint/no-unused-vars */

import { TripServices } from "../services";
import httpStatusCodes from "http-status-codes";
import { catchAsync } from "@/app/utils/catchAsync";
import { sendResponse } from "@/app/utils/sendResponse";
import { type Response, type Request, type NextFunction } from "express";

export const riderHistory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const riderId = req.user.userId as string;
    const history = await TripServices.riderHistory(riderId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: "Fetched Rider History Successfully.",
      data: history,
    });
  }
);
