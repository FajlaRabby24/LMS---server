import { Response } from "express";
import { ApiResponse } from "../@types/api";

export const sendError = (
  res: Response,
  message: string,
  statusCode: number,
  errors?: string[]
) => {
  const response: ApiResponse = {
    success: false,
    message,
    errors: errors || [],
  };

  return res.status(statusCode).json(response);
};
