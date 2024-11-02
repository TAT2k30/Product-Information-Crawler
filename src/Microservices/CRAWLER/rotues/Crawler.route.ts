import { Router } from "express";
import { fetchProductData } from "../controllers/Crawler.Controller";
import { crawlerFetchDataMiddleWare } from "../middlewares/contracts/crawler.middleware";

const router = Router();

router.post("/fetchData", crawlerFetchDataMiddleWare, fetchProductData);

export default router;
