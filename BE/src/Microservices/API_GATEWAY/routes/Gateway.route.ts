import { Router } from "express";
import { fetchData } from "../controllers/ApiGateway.Controller";


const router = Router();

router.post("/fetchData", fetchData);

export default router;
