/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatusCodes from "http-status-codes";
import { AdminServices } from "./admin.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
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

const getAllDrivers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AdminServices.getAllDrivers();

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: "All drivers retrieved successfully",
      data: result,
    });
  }
);

const getAllRiders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AdminServices.getAllRiders();

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: "All riders retrieved successfully",
      data: result,
    });
  }
);

const getAllTrips = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AdminServices.getAllTrips();

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: "All trips retrieved successfully",
      data: result,
    });
  }
);

const approveDriver = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { driverId } = req.params;
    const result = await AdminServices.approveDriver(driverId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: "Driver approved successfully",
      data: result,
    });
  }
);

const suspendDriver = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { driverId } = req.params;
    const result = await AdminServices.suspendDriver(driverId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: "Driver suspended successfully",
      data: result,
    });
  }
);

const blockUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { role } = req.body;

    const result = await AdminServices.blockUser(userId, role);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: `${role} blocked successfully`,
      data: result,
    });
  }
);

const unblockUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { role } = req.body;

    const result = await AdminServices.unblockUser(userId, role);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCodes.OK,
      message: `${role} unblocked successfully`,
      data: result,
    });
  }
);

export const AdminControllers = {
  loginAdmin,
  getAllDrivers,
  getAllRiders,
  getAllTrips,
  approveDriver,
  suspendDriver,
  blockUser,
  unblockUser,
};
