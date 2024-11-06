import { Router } from "express";
import { handleFetchProductData, handleGetAllProductInfoFromDb } from "../controllers/Crawler.Controller";
import { crawlerFetchDataMiddleWare } from "../middlewares/contracts/crawler.middleware";

const router = Router();

router.post("/fetchData", crawlerFetchDataMiddleWare, handleFetchProductData);
router.get("/getData", handleGetAllProductInfoFromDb);
export default router;
