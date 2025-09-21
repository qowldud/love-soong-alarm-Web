import type {
  BlockUser,
  CheckSendMessage,
  ConnectionSuccess,
  ErrorType,
  ExcessChat,
  ListUpdate,
  MessageRead,
  NotifiactionUpdate,
  Notification,
  ReadAllNotification,
  ReadNotification,
  SubscribeList,
  SuccessSubscribe,
  SuccesUnsubscribe,
  UnblockUser,
  UnreadBadgeUpdate,
  UnsubscribeList,
} from "../types/socket";
import { useChatStore } from "../store/chatStore";

import { useMessageStore } from "../store/messageStore";
import { useHomeStore } from "../store/homeStore";

export const useWebSocket = () => {
  const setExcessChat = useChatStore((state) => state.setExcessChat);
  const setIsNoticeAlarm = useHomeStore((state) => state.setIsNoticeAlarm);
  const setIsChatAlarm = useHomeStore((state) => state.setIsChatAlarm);
  const setNewChats = useMessageStore((state) => state.setNewChats);

  const handleConnectionSuccess = (data: ConnectionSuccess) => {
    // toast.success("채팅이 연결되었습니다.");
    console.log("✅ CONNECTION_SUCCESS:", data);
  };

  const handleUnreadBadgeUpdate = (data: UnreadBadgeUpdate) => {
    console.log("📩 UNREAD_BADGE_UPDATE:", data);

    if (data.totalUnreadCount) setIsChatAlarm(true);
    else setIsChatAlarm(false);
  };

  const handleMessageRead = (data: MessageRead) => {
    console.log("📩 MESSAGE_READ:", data);
    window.dispatchEvent(new CustomEvent("revalidate:chat"));
  };

  const handleSubscribe = (data: SuccessSubscribe) => {
    console.log("🔔 SUBSCRIBE:", data);
  };

  const handleUnsubscribe = (data: SuccesUnsubscribe) => {
    console.log("🔕 UNSUBSCRIBE:", data);
  };

  const handleChatMessage = (data: CheckSendMessage) => {
    console.log("💬 CHAT_MESSAGE:", data);
    window.dispatchEvent(new CustomEvent("revalidate:chat"));
  };

  const handleExcessChat = (data: ExcessChat) => {
    console.log("💬 MESSAGE_COUNT_LIMIT:", data);
    setExcessChat(true);
  };

  const handleChatListUpdate = (data: ListUpdate) => {
    console.log("📜 CHAT_LIST_UPDATE:", data);
    setNewChats({ newChat: data });
  };

  const handleSubscribeList = (data: SubscribeList) => {
    console.log("SubscribeList: ", data);
  };

  const handleUnsubscribeList = (data: UnsubscribeList) => {
    console.log("UnsubscribeList: ", data);
  };

  const handleNewUserChat = () => {
    console.log("NEW_CHAT_ROOM_CREATED");
    return;
  };

  const handleNotification = (data: Notification) => {
    console.log("Notification: ", data);
  };

  const handleNotifiactionAlarm = (data: NotifiactionUpdate) => {
    console.log("Notiication Update: ", data);
    if (data.hasUnread) setIsNoticeAlarm(true);
    else setIsNoticeAlarm(false);
  };

  const handleBlockUser = (data: BlockUser) => {
    console.log("BLOCK_USER: ", data);
  };

  const handleUnblockUser = (data: UnblockUser) => {
    console.log("UNBLOCK_USER: ", data);
  };

  const handleReadAllNotificatino = (data: ReadAllNotification) => {
    console.log("Read All Notification: ", data);
  };

  const handleReadNotification = (data: ReadNotification) => {
    console.log("Read Notification: ", data);
  };

  const handleError = (data: ErrorType) => {
    console.error(data.message);
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
    handleSubscribeList,
    handleUnsubscribeList,
    handleNewUserChat,
    handleBlockUser,
    handleUnblockUser,
    handleNotification,
    handleNotifiactionAlarm,
    handleReadAllNotificatino,
    handleReadNotification,
    handleError,
  };
};
