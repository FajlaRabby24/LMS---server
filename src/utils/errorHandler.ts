import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "./constants";
import { sendError } from "./response";

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR
  ) {
    super(message);
    (this.statusCode = statusCode),
      (this.isOperational = true),
      Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// global error handler middleware
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err?.message;

  error.statusCode = error?.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  error.status = error.status || "error";

  // handle specific errors
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors)?.map((val: any) => val.message);
    error.message = `Validation error: ${errors.join(", ")}`;
    error.statusCode = HTTP_STATUS.BAD_REQUEST;
    return sendError(res, error.message, error.statusCode, errors);
  }

  if (err.code === 1100) {
    const field = Object.keys(err.keyValue || {})[0];
    const value = field ? err.keyValue[field] : "unknown";
    error.message = `${field} ${value} already exists.`;
    error.statusCode = HTTP_STATUS.CONFLIECT;
  }

  if (err.name === "CastError") {
    error.message = `Invalid ${err.path}: ${err.value}`;
    error.statusCode = HTTP_STATUS.BAD_REQUEST;
  }

  if (err.name === "JsonWebTokenError") {
    error.message = `Invalid token. Please log in again.`;
    error.statusCode = HTTP_STATUS.UNAUTHORIZED;
  }

  if (err.name === "TokenExpiredError") {
    error.message = "Your token has expired. Please log in again";
    error.statusCode = HTTP_STATUS.UNAUTHORIZED;
  }

  if (process.env.NODE_ENV === "development") {
    return sendError(res, error.message, error.statusCode);
  }

  if (error.isOperational) {
    return sendError(res, error.message, error.statusCode);
  }

  console.error("Error 💥", err);
  return sendError(
    res,
    "Something went very wrong",
    HTTP_STATUS.INTERNAL_SERVER_ERROR
  );
};

// ------ unhandled promise rejection ----------
export const handleProccessErrors = () => {
  process.on("unhandledRejection", (err: any) => {
    console.error("UNHANDLED REJECTION! 💥 Shutting down...");
    console.error(err.name, err.message);
    process.exit(1);
  });

  process.on("uncaughtException", (err: any) => {
    console.error("UNHANDLED EXCEPTION! 💥 Shutting down...");
    console.error(err.name, err.message);
    process.exit(1);
  });
};

// -------- create a custom error ------------
export const createError = (message: string, statusCode: number) => {
  return new AppError(message, statusCode);
};
