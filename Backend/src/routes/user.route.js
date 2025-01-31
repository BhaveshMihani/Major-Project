import { Router } from "express";
import { protectRoute } from './../controller/middleware/auth.middleware.js';
import { getAllUsers } from "../controller/user.controller.js";

const router = Router();

router.get("/", protectRoute, getAllUsers)
//todo: GetMessages 

export default router