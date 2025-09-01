/* eslint-disable @typescript-eslint/no-unused-vars */
import { RiderServices } from "../services";
import httpStatusCodes from "http-status-codes";
import { catchAsync } from "@/app/utils/catchAsync";
import { sendResponse } from "@/app/utils/sendResponse";
import { type Response, type Request, type NextFunction } from "express";

export const loginRider = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const rider = await RiderServices.loginRider(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: "Rider Logged-in Successfully.",
      data: rider,
    });
  }
);
