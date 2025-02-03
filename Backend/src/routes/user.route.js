import { Router } from "express";
<<<<<<< HEAD
import { protectRoute } from '../controller/middleware/auth.middleware.js';
=======
>>>>>>> 94f5d12c1c59c5a290bb52eeee1540205df596b2
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