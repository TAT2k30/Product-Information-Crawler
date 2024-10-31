import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("============> ", errors);
    res.status(400).json({
      success: false,
      errors: errors.array().map((error) => ({
        field: error.type,
        message: error.msg,
      })),
    });
    return;
  }
  next();
};
