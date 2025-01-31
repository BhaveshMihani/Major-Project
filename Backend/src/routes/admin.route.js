import { Router } from "express";
import {
  protectRoute,
  requireAdmin,
} from "../controller/middleware/auth.middleware.js";
import {
  createSong,
  deleteSong,
  deleteAlbum,
  createAlbum,
  checkAdmin,
} from "../controller/admin.controller.js";

const router = Router();

// slightly optimize clean code
router.use(protectRoute, requireAdmin);

router.get("/check", protectRoute, requireAdmin, checkAdmin);

router.post("/songs", protectRoute, requireAdmin, createSong);
router.delete("/songs/:id", protectRoute, requireAdmin, deleteSong);

router.post("/albums", protectRoute, requireAdmin, createAlbum);
router.post("/albums", protectRoute, requireAdmin, deleteAlbum);

export default router;
