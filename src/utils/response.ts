import { Response } from "express";
import { ApiResponse } from "../@types/api";

// --------- send error ----------
export const sendError = (
  res: Response,
  message: string,
  statusCode: number = 500,
  errors?: string[]
) => {
  const response: ApiResponse = {
    success: false,
    message,
    errors: errors || [],
  };

  return res.status(statusCode).json(response);
};

// --------- send success ----------
export const sendSuccess = <T>(
  res: Response,
  message?: string,
  data?: T,
  statusCode: number = 200,
  meta?: ApiResponse["meta"]
) => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
    meta,
  };

  return res.status(statusCode).json(response);
};
