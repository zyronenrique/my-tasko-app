export interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface UnreadCount {
  unreadcount: number;
}
