import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { crawlerConfig } from "../../configs";
import { errorHandler } from "./middlewares/handlers/error.handler";
import { notFoundHandler } from "./middlewares/handlers/notFound.handler";
import Crawler  from "../CRAWLER/rotues/Crawler.route";
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Định nghĩa các route
app.use("/crawler", Crawler);

// Middleware xử lý 404
app.use(notFoundHandler);

// Middleware xử lý lỗi
app.use(errorHandler);

// Lắng nghe cổng
app.listen(crawlerConfig.port, () => {
  console.log(
    `Server for Crawler running on port http://localhost:${crawlerConfig.port}`
  );
});
