export interface Notice {
  id: number;
  matchingUserId: number;
  message: string;
  isRead: boolean;
  notificationTime: string;
}
