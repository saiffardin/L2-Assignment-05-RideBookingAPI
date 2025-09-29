/* eslint-disable @typescript-eslint/no-unused-vars */

import { TripServices } from "../services";
import httpStatusCodes from "http-status-codes";
import { catchAsync } from "@/app/utils/catchAsync";
import { sendResponse } from "@/app/utils/sendResponse";
import { type Response, type Request, type NextFunction } from "express";

export const availableTripList = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const availableTrips = await TripServices.availableTripList();

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: "Fetched Available Trips Successfully.",
      data: availableTrips,
    });
  }
);
