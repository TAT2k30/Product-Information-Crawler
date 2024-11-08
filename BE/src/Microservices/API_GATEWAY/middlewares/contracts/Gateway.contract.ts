import { rateLimitMiddleware } from "../RateLimit.middleware";


const createRateLimitMiddleware = rateLimitMiddleware({
    rateLimit: 5,
    interval: 60000,
    timeout: 10000,
  });


