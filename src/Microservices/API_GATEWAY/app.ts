import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import config from "../../configs";



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lắng nghe cổng
app.listen(config.port, () => {
  console.log(`Server for Api Gateway running on port http://localhost:${config.port}`);
});
