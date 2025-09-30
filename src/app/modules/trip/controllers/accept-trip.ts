/* eslint-disable @typescript-eslint/no-unused-vars */

import { TripServices } from "../services";
import httpStatusCodes from "http-status-codes";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { type Response, type Request, type NextFunction } from "express";

export const acceptTrip = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const driverId = req.user.userId as string;
    const { tripId } = req.params;

    const trip = await TripServices.acceptTrip(tripId, driverId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: "Driver Assigned Successfully.",
      data: trip,
    });
  }
);
