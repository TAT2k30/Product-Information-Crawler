import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.GATEWAY_PORT || 3000,
};

export default config;