import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/errorHandler";

type AsyncFuntion = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const catchAsync = (fn: AsyncFuntion) => asyncHandler(fn);
