import { Router } from "express";
import { handleFetchProductData } from "../controllers/Crawler.Controller";
import { crawlerFetchDataMiddleWare } from "../middlewares/contracts/crawler.middleware";

const router = Router();

router.post("/fetchData", crawlerFetchDataMiddleWare, handleFetchProductData);

export default router;
