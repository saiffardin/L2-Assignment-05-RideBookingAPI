/* eslint-disable @typescript-eslint/no-unused-vars */

import httpStatusCodes from "http-status-codes";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { type Response, type Request, type NextFunction } from "express";
import { RiderServices } from "../services";

export const riderHistory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const riderId = req.user.userId as string;
    const history = await RiderServices.riderHistory(riderId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: "Fetched Rider History Successfully.",
      data: history,
    });
  }
);
