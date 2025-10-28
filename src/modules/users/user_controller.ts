import { Request, Response } from "express";
import { catchAsync } from "../../middleware/catchAsync";
import * as userService from "./user_services";

export const register = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.registerUser(req.body);
  if (!result?.success) {
    return res.status(400).json("Registraton failed");
  }

  res.status(201).json({ message: "User registered successfully" });
});
