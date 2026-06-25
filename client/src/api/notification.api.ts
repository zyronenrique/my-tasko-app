import { api } from "../lib/api-client";
import type { Notification, UnreadCount } from "../types/notification.types";

export async function getNotifications() {
  return api<Notification[]>("/api/notifications");
}

export async function getUnreadCount() {
  return api<UnreadCount>("/api/notifications/unread-count");
}

export async function markAsRead(id: number) {
  return api(`/api/notifications/${id}/read`,
    {
      method: "PATCH",
    }
  );
}

export function markAllAsRead() {
  return api("/api/notifications/read-all",
    {
      method: "PATCH",
    }
  );
}
