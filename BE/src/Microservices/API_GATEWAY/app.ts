import express from "express";
import cors from "cors";
import { gatewayConfig } from "../../configs";
import { rateLimitMiddleware } from "./middlewares/RateLimit.middleware";
import { createProxyMiddleware } from "http-proxy-middleware";
import RootAPI from "./routes/Gateway.routes";
const app = express();

// Middlewares chung
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/gateWay", RootAPI);

app.listen(gatewayConfig.port, () => {
  console.log(
    `Server for API Gateway running on port http://localhost:${gatewayConfig.port}`
  );
});
