/* eslint-disable @typescript-eslint/no-unused-vars */

import httpStatusCodes from "http-status-codes";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { type Response, type Request, type NextFunction } from "express";
import { TripServices } from "../services";
import { TripStatus } from "../../../constants";

export const tripComplete = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { role, userId } = req.user;
    const { tripId } = req.params;

    const completedTrip = await TripServices.updateTripStatus({
      tripId,
      actorRole: role,
      actorId: userId as string,
      newStatus: TripStatus.TRIP_COMPLETED,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: "Trip Completed Successfully.",
      data: completedTrip,
    });
  }
);
