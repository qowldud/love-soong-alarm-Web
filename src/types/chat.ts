export interface MakeChat {
  chatRoomId: number;
}

export interface ChatRooms {
  userSlotInfo: {
    maxSlot: number;
    remainingSlot: number;
    isPrepass: boolean;
  };
  chatRooms: ChatRoom[];
}

export interface ChatRoom {
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
  isPartnerBlocked: boolean;
  isBlockedByPartner: boolean;
}

interface Partner {
  userId: number;
  nickname: string;
  emoji: string;
  age: number;
  major: string;
  interests: Interests[];
}

interface Interests {
  label: string;
  hashtags: string[];
}

export interface RecentMessage {
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
