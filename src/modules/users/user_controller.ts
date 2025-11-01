import { Request, Response } from "express";
import { catchAsync } from "../../middleware/catchAsync";
import { sendError } from "../../utils/response";
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

  res.status(201).json({ message: "User registered successfully" });
});
