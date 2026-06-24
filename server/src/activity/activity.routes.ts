import { Router } from "express";
import { getActivities } from "./activity.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
router.use(authMiddleware);
router.get("/", getActivities);

export default router;
