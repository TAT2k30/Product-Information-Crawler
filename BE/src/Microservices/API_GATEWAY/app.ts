import express from "express";
import cors from "cors";
import { gatewayConfig } from "../../configs";
import { rateLimitMiddleware } from "./middlewares/RateLimit.middleware";
import { createProxyMiddleware } from "http-proxy-middleware";
import RootAPI from "./routes/Gateway.routes";
import apicache from "apicache";

const app = express();

// Middlewares chung
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let cacheMiddleware = apicache.middleware;
app.use("/gateWay", cacheMiddleware("2 minutes"), RootAPI);

app.listen(gatewayConfig.port, () => {
  console.log(
    `Server for API Gateway running on port http://localhost:${gatewayConfig.port}`
  );
});
