import { api } from "../lib/api-client";
import type { UnreadCount } from "../types/notification.types";

export async function getNotifications() {
  return api("/api/notifications");
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
