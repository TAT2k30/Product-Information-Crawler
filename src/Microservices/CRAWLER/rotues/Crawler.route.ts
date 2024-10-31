import { Router } from "express";
import { fetchData } from "../controllers/Crawler.Controller";
import { crawlerFetchDataMiddleWare } from "../middlewares/contracts/crawler.middleware";

const router = Router();

router.post("/fetchData", crawlerFetchDataMiddleWare, fetchData);

export default router;
