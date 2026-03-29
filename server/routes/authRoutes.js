import { Router } from "express";
import { postFirebaseSession } from "../controllers/authController.js";

const router = Router();
router.post("/firebase", postFirebaseSession);

export default router;
