import { toast } from "react-toastify";
import type {
  CheckSendMessage,
  ConnectionSuccess,
  ErrorType,
  ExcessChat,
  ListUpdate,
  MessageRead,
  SuccessSubscribe,
  SuccesUnsubscribe,
  UnreadBadgeUpdate,
} from "../types/socket";
import { useChatStore } from "../store/chatStore";
import type { RecentMessage } from "../types/chat";
import { useMessageStore } from "../store/messageStore";

export const useWebSocket = () => {
  const setExcessChat = useChatStore((state) => state.setExcessChat);
  const setNewMessage = useMessageStore((s) => s.setNewMessage);

  const handleConnectionSuccess = (data: ConnectionSuccess) => {
    toast.success("채팅이 연결되었습니다.");
    console.log("✅ CONNECTION_SUCCESS:", data);
  };

  const handleUnreadBadgeUpdate = (data: UnreadBadgeUpdate) => {
    console.log("📩 UNREAD_BADGE_UPDATE:", data);
  };

  const handleMessageRead = (data: MessageRead) => {
    console.log("📩 MESSAGE_READ:", data);
  };

  const handleSubscribe = (data: SuccessSubscribe) => {
    console.log("🔔 SUBSCRIBE:", data);
  };

  const handleUnsubscribe = (data: SuccesUnsubscribe) => {
    console.log("🔕 UNSUBSCRIBE:", data);
  };

  const handleChatMessage = (data: CheckSendMessage) => {
    console.log("💬 CHAT_MESSAGE:", data);

    const recent: RecentMessage = {
      messageId: data.messageId,
      content: data.content,
      createdAt: data.timestamp,
      isSentByMe: data.isSentByMe,
      isRead: false,
    };

    setNewMessage({ item: recent });
  };

  const handleExcessChat = (data: ExcessChat) => {
    console.log("💬 MESSAGE_COUNT_LIMIT:", data);
    setExcessChat(true);
  };

  const handleChatListUpdate = (data: ListUpdate) => {
    console.log("📜 CHAT_LIST_UPDATE:", data);
  };

  const handleError = (data: ErrorType) => {
    toast.error(data.message);
  };

  return {
    handleConnectionSuccess,
    handleUnreadBadgeUpdate,
    handleMessageRead,
    handleSubscribe,
    handleUnsubscribe,
    handleChatMessage,
    handleExcessChat,
    handleChatListUpdate,
    handleError,
  };
};
