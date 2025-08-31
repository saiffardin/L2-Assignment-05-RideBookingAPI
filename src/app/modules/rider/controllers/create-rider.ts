/* eslint-disable @typescript-eslint/no-unused-vars */
import { catchAsync } from "@/app/utils/catchAsync";
import { sendResponse } from "@/app/utils/sendResponse";
import { type Response, type Request, type NextFunction } from "express";
import httpStatusCodes from "http-status-codes";
import { RiderService } from "../services";

export const createRider = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const rider = await RiderService.createRider(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.CREATED,
      message: "Rider Created Successfully",
      data: rider,
    });
  }
);
