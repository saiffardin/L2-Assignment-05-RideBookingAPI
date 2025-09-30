/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatusCodes from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { type Response, type Request, type NextFunction } from "express";
import { LocationServices } from "./location.service";

const seedLocations = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const locs = await LocationServices.seedLocations();

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.CREATED,
      message: "Seeded locations successfully.",
      data: locs,
    });
  }
);

export const LocationControllers = { seedLocations };
