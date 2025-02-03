import { Router } from "express";
import { protectRoute } from "../controller/middleware/auth.middleware.js"
import { getAllUsers, handleClerkWebhook, registerUser, getMessages } from "../controller/user.controller.js";


const router = Router();

// Existing route
router.get("/", protectRoute, getAllUsers);

// New route for user registration
router.post("/register", registerUser);

// New route for Clerk webhook
router.post("/clerk-webhook", handleClerkWebhook);

// (NEW CHANGE) Router for messages addded
router.get("/messages/:userId", protectRoute, getMessages);
export default router;