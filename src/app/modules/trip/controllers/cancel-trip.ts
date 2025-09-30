/* eslint-disable @typescript-eslint/no-unused-vars */

import httpStatusCodes from "http-status-codes";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { type Response, type Request, type NextFunction } from "express";
import { TripServices } from "../services";

export const cancelTrip = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { role, userId } = req.user;
    const { tripId } = req.params;
    const trip = await TripServices.cancelTrip({
      tripId,
      actorRole: role,
      actorId: userId as string,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: "Trip Cancelled Successfully.",
      data: trip,
    });
  }
);
