import { Request, Response, NextFunction } from "express";
import { IApiError } from "../../interfaces/IApiError.interface";

// Middleware để xử lý lỗi
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errorResponse: IApiError = {
    statusCode: err.status || 500,
    message: err.message || "Internal Server Error",
    details: err.details || undefined,
    timestamp: new Date().toISOString(),
    path: req.originalUrl, // URL yêu cầu gây ra lỗi
  };

  res.status(errorResponse.statusCode).json(errorResponse);
};
