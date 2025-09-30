/* eslint-disable @typescript-eslint/no-unused-vars */
import { RiderServices } from "../services";
import httpStatusCodes from "http-status-codes";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { type Response, type Request, type NextFunction } from "express";

export const createRider = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const rider = await RiderServices.createRider(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.CREATED,
      message: "Rider Created Successfully",
      data: rider,
    });
  }
);
