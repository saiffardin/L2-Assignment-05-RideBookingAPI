/* eslint-disable @typescript-eslint/no-unused-vars */

import { TripServices } from "../services";
import httpStatusCodes from "http-status-codes";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { type Response, type Request, type NextFunction } from "express";

export const requestTrip = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const riderId = req.user.userId as string;
    const { pickup, destination } = req.body;
    const ride = await TripServices.requestTrip(riderId, pickup, destination);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.CREATED,
      message: "Created Trip Request Successfully.",
      data: ride,
    });
  }
);
