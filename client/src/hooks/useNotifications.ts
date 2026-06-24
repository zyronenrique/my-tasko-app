import { useQuery, useMutation }from "@tanstack/react-query";
import { getNotifications, getUnreadCount, markAllAsRead, markAsRead } from "../api/notification.api";
import { QUERY_KEYS }from "../constants/query-keys";
import { queryClient } from "../lib/query-client";

export function useNotifications() {
  return useQuery({
    queryKey: [QUERY_KEYS.NOTIFICATIONS],
    queryFn: getNotifications,
  });
}

export function useUnreadCount() {
  return useQuery({
    queryKey: [QUERY_KEYS.UNREAD_COUNT],
    queryFn: getUnreadCount,
  });
}

export function useMarkNotificationAsRead() {
  return useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.NOTIFICATIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.UNREAD_COUNT],
      });
    },
  });
}

export function useMarkAllNotificationAsRead() {
  return useMutation({
    mutationFn: markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.NOTIFICATIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.UNREAD_COUNT],
      });
    },
  });
}
