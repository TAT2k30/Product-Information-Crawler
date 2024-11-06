import { Request, Response, NextFunction } from "express";
import { RateLimitOptions } from "../interfaces/rateLimit.interface";

export const requestCounts: {
  [ip: string]: { count: number; timestamp: number };
} = {};

export const rateLimitMiddleware = ({
  rateLimit,
  interval,
  timeout,
}: RateLimitOptions): ((
  req: Request,
  res: Response,
  next: NextFunction
) => void) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const ip = req.ip || "unknown-ip";
    const currentTime = Date.now();

    if (
      !requestCounts[ip] ||
      currentTime - requestCounts[ip].timestamp > interval
    ) {
      requestCounts[ip] = { count: 1, timestamp: currentTime };
    } else {
      requestCounts[ip].count += 1;
    }

    // Kiểm tra giới hạn yêu cầu
    if (requestCounts[ip].count > rateLimit) {
      console.warn(`IP ${ip} đã vượt quá giới hạn yêu cầu.`);
      res.status(429).json({
        message: "Quá nhiều yêu cầu. Vui lòng thử lại sau.",
      });
    }

    // Thiết lập thời gian chờ cho yêu cầu
    res.setTimeout(timeout, () => {
      console.warn(`Yêu cầu từ IP ${ip} đã hết thời gian chờ.`);
      console.log(`Yêu cầu chưa hoàn thành: ${req.method} ${req.originalUrl}`);
      res.status(503).json({
        message: "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại sau.",
      });
    });

    next();
  };
};
