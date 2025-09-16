export interface ChatRooms {
  ChatRooms: ChatRoom[];
}

interface ChatRoom {
  chatRoomId: number;
  emoji: string;
  partnerNickname: string;
  lastMessageInfo: LastMessageInfo;
}

interface LastMessageInfo {
  content: string;
  timestamp: string;
  isSentByMe: boolean;
  isRead: boolean;
}

export interface ChatDetail {
  partner: Partner;
  recentMessages: RecentMessage[];
  hasMoreMessages: boolean;
  oldestMessageId: number;
}

interface Partner {
  userId: number;
  nickname: string;
  emoji: string;
  age: number;
  major: string;
  interests: Intersets[];
}

interface Intersets {
  label: string;
  hastags: string[];
}

interface RecentMessage {
  messageId: number;
  content: string;
  createdAt: string;
  isSentByMe: boolean;
  isRead: boolean;
}

export interface PrevMessage {
  messages: Message[];
  hasMoreMessages: boolean;
  oldestMessageId: number;
}

interface Message {
  messageId: number;
  content: string;
  createdAt: string;
  isSentByMe: boolean;
  isRead: boolean;
}
