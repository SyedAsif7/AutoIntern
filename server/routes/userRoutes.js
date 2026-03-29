import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { getMe, putProfile } from "../controllers/userController.js";

const router = Router();

router.get("/me", requireAuth, getMe);
router.post("/profile", requireAuth, putProfile);
router.put("/profile", requireAuth, putProfile);

export default router;
