import type { Request, Response } from "express";
import * as notificationService from "../notifications/notification.service";

export async function getNotifications(req: Request, res: Response) {
  const notifications = await notificationService.getNotifications(req.user!.userId);
  return res.json(notifications);
}

export async function getUnreadCount(req: Request, res: Response) {
  const unreadcount = await notificationService.getUnreadCount(req.user!.userId);
  return res.json({unreadcount});
}

export async function markAsRead(req: Request, res: Response) {
  const id = Number(req.params.id);
  const read = await notificationService.markAsRead(id, req.user!.userId);
  return res.json(read);
}

export async function markAllAsRead(req: Request, res: Response) {
  await notificationService.markAllAsRead(req.user!.userId);
  return res.json({message: "Notifications marked as read"});
}
