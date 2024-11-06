import { Router } from "express";
import { fetchData, getData } from "../controllers/ApiGateway.Controller";
import { rateLimitMiddleware } from "../middlewares/RateLimit.middleware";

const router = Router();

const createRateLimitMiddleware = rateLimitMiddleware({
  rateLimit: 5,
  interval: 60000,
  timeout: 10000,
});

router.post("/fetchData", createRateLimitMiddleware, fetchData);
router.get("/getData", createRateLimitMiddleware, getData);

export default router;
