/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatusCodes from "http-status-codes";
import { AdminServices } from "./admin.service";
import { catchAsync } from "@/app/utils/catchAsync";
import { sendResponse } from "@/app/utils/sendResponse";
import { type Response, type Request, type NextFunction } from "express";

const loginAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const admin = await AdminServices.loginAdmin(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: `${admin.role} Logged-in Successfully.`,
      data: admin,
    });
  }
);

export const AdminControllers = { loginAdmin };
