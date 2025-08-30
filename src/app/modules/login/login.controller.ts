/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoginService } from "./login.service";
import httpStatusCodes from "http-status-codes";
import { catchAsync } from "@/app/utils/catchAsync";
import { sendResponse } from "@/app/utils/sendResponse";
import { type Response, type Request, type NextFunction } from "express";

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await LoginService.login(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: "User Logged-in Successfully.",
      data: user,
    });
  }
);

export const LoginControllers = { login };
