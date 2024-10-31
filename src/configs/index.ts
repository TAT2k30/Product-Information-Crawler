import dotenv from "dotenv";

dotenv.config();

export const gatewayConfig = {
  port: process.env.GATEWAY_PORT || 3000,
};

export const crawlerConfig = {
  port: process.env.CRAWLER_PORT  || 3001,
}
