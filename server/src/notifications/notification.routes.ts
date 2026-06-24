import { Router } from "express";
import { getNotifications, getUnreadCount, markAllAsRead, markAsRead } from "./notification.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
router.use(authMiddleware);
router.get("/", getNotifications);
router.get("/unread-count", getUnreadCount);
router.patch("/read-all", markAllAsRead);
router.patch("/:id/read", markAsRead);

export default router;
