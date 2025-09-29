/* eslint-disable @typescript-eslint/no-unused-vars */

import httpStatusCodes from "http-status-codes";
import { catchAsync } from "@/app/utils/catchAsync";
import { sendResponse } from "@/app/utils/sendResponse";
import { type Response, type Request, type NextFunction } from "express";
import { TripServices } from "../services";
import { TripStatus } from "@/app/constants";

export const tripStart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { role, userId } = req.user;
    const { tripId } = req.params;

    const updatedTrip = await TripServices.updateTripStatus({
      tripId,
      actorRole: role,
      actorId: userId as string,
      newStatus: TripStatus.TRIP_STARTED,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: "Trip Started Successfully.",
      data: updatedTrip,
    });
  }
);
