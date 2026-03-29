import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import {
  getDashboardSummary,
  postTodayComplete,
} from "../controllers/dashboardController.js";

const router = Router();

router.get("/summary", requireAuth, getDashboardSummary);
router.post("/today-complete", requireAuth, postTodayComplete);

export default router;
