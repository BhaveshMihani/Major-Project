import { Router } from "express";
import { protectRoute, requireAdmin } from './../controller/middleware/auth.middleware.js';
import { getStats } from "../controller/stat.controller.js";

const router = Router();

router.get("/", protectRoute,requireAdmin,getStats)

export default router