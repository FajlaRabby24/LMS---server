import { Request, Response } from "express";
import { catchAsync } from "../../middleware/catchAsync";
import { sendError, sendSuccess } from "../../utils/response";
import * as userService from "./user_services";

export const register = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.registerUser(req.body);

  if (!result?.success) {
    return sendError(
      res,
      result.message || "Registration failed",
      400,
      result.errors
    );
  }

  return sendSuccess(
    res,
    result.message,
    result.data?.message ?? result.message,
    201
  );
});
