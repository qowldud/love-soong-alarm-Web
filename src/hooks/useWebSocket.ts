import { toast } from "react-toastify";
import type {
  CheckSendMessage,
  ConnectionSuccess,
  ErrorType,
  ListUpdate,
  MessageRead,
  SuccessSubscribe,
  SuccesUnsubscribe,
  UnreadBadgeUpdate,
} from "../types/socket";

export const useWebSocket = () => {
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
  };

  const handleChatListUpdate = (data: ListUpdate) => {
    console.log("📜 CHAT_LIST_UPDATE:", data);
  };

  const handleError = (data: ErrorType) => {
    console.error("❌ ERROR:", data);
  };

  return {
    handleConnectionSuccess,
    handleUnreadBadgeUpdate,
    handleMessageRead,
    handleSubscribe,
    handleUnsubscribe,
    handleChatMessage,
    handleChatListUpdate,
    handleError,
  };
};
