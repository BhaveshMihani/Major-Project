import { Router } from "express";
import { protectRoute } from '../controller/middleware/auth.middleware.js';
import { getAllUsers, handleClerkWebhook, registerUser } from "../controller/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

// Existing route
router.get("/", protectRoute, getAllUsers);

// New route for user registration
router.post("/register", registerUser);

// New route for Clerk webhook
router.post("/clerk-webhook", handleClerkWebhook);

// todo: GetMessages

export default router;