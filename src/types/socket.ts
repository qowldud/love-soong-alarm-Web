// 본인 : 연결 확인 메세지
export interface ConnectionSuccess {
  type: "CONNETION_SUCCESS";
  userId: number;
  userNickname: string;
  timestamp: string;
  message: string;
}

// 본인 : 배지 업데이트
export interface UnreadBadgeUpdate {
  type: "UNREAD_BADGE_UPDATE";
  totalUnreadCount: number;
}

// 상대 : 채팅방 구독중
export interface MessageRead {
  type: "MESSAGE_READ";
  chatRoomId: number;
  readerId: number;
}

// 본인 : 채팅방 구독
export interface SuccessSubscribe {
  type: "SUBSCRIBE";
  chatRoodId: number;
  message: string;
}

// 본인 : 채팅방 구독 해제
export interface SuccesUnsubscribe {
  type: "UNSUBSCRIBE";
  chatRoomId: number;
  message: string;
}

// 본인 : 보낸 메세지 확인용
export interface CheckSendMessage {
  type: "CHAT_MESSAGE";
  chatRoomId: number;
  senderId: number;
  messageId: number;
  content: string;
  timestamp: string;
  isSentByMe: boolean;
}

export interface ExcessChat {
  type: "MESSAGE_COUNT_LIMIT";
}

// 본인 : 채팅창 목록 업데이트 정보
export interface ListUpdate {
  type: "CHAT_LIST_UPDATE";
  chatRoomId: number;
  lastMessageContent: string;
  timestamp: string;
  isMyMessage: boolean;
  isRead: boolean;
}

export interface SubscribeList {
  type: "CHAT_LIST_SUBSCRIBE";
  message: string;
}

export interface UnsubscribeList {
  type: "CHAT_LIST_UNSUBSCRIBE";
  message: string;
}

export interface NewChatUpdate {
  type: "NEW_CHAT_ROOM_CREATED";
  chatRoomId: number;
  partnerNickname: string;
  partnerEmoji: string;
  createdAt: string;
}
export interface NewChatUpdate {
  type: "NEW_CHAT_ROOM_CREATED";
  chatRoomId: number;
  partnerNickname: string;
  partnerEmoji: string;
  createdAt: string;
}

export interface Notification {
  type: "NOTIFICATION";
  notificationId: number;
  matchingUserId: number;
  message: string;
}

export interface NotifiactionUpdate {
  type: "UNREAD_NOTIFICATION_BADGE_UPDATE";
  hasUnread: boolean;
}

export interface ReadNotification {
  type: "READ_NOTIFICATION";
  notificationId: number;
}

export interface ReadAllNotification {
  type: "READ_ALL_NOTIFICATION";
  isAll: boolean;
}

// 에러 페이지
export interface ErrorType {
  type: "ERROR";
  errorCode: string;
  message: string;
}
