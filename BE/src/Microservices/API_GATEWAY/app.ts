import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { gatewayConfig } from "../../configs";


const app = express();
//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Lắng nghe cổng
app.listen(gatewayConfig.port, () => {
  console.log(`Server for Api Gateway running on port http://localhost:${gatewayConfig.port}`);
});
