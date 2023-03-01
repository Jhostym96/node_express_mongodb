import { Router } from "express";
import { getPast, getFuture } from "../controllers/historial.controller.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

router.get("/past/", requireToken, getPast);
router.get("/futuro/", requireToken, getFuture);

export default router;
