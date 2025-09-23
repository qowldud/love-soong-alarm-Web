import type {
  ListUpdate,
  NotifiactionUpdate,
  UnreadBadgeUpdate,
} from "../types/socket";
import { useChatStore } from "../store/chatStore";

import { useMessageStore } from "../store/messageStore";
import { useHomeStore } from "../store/homeStore";
import { toast } from "react-toastify";

export const useWebSocket = () => {
  const setExcessChat = useChatStore((state) => state.setExcessChat);
  const setIsNoticeAlarm = useHomeStore((state) => state.setIsNoticeAlarm);
  const setIsChatAlarm = useHomeStore((state) => state.setIsChatAlarm);
  const setNewChats = useMessageStore((state) => state.setNewChats);

  const handleConnectionSuccess = () => {};

  const handleUnreadBadgeUpdate = (data: UnreadBadgeUpdate) => {
    if (data.totalUnreadCount) setIsChatAlarm(true);
    else setIsChatAlarm(false);
  };

  const handleMessageRead = () => {
    window.dispatchEvent(new CustomEvent("revalidate:chat"));
  };

  const handleSubscribe = () => {};

  const handleUnsubscribe = () => {};

  const handleChatMessage = () => {
    window.dispatchEvent(new CustomEvent("revalidate:chat"));
  };

  const handleExcessChat = () => {
    setExcessChat(true);
  };

  const handleChatListUpdate = (data: ListUpdate) => {
    setNewChats({ newChat: data });
  };

  const handleSubscribeList = () => {};

  const handleUnsubscribeList = () => {};

  const handleNewUserChat = () => {
    return;
  };

  const handleNotification = () => {};

  const handleNotifiactionAlarm = (data: NotifiactionUpdate) => {
    if (data.hasUnread) setIsNoticeAlarm(true);
    else setIsNoticeAlarm(false);
  };

  const handleBlockUser = () => {
    toast.info("차단되었습니다.");
    window.dispatchEvent(new CustomEvent("revalidate:chat"));
  };

  const handleUnblockUser = () => {
    toast.info("차단이 해제되었습니다.");
    window.dispatchEvent(new CustomEvent("revalidate:chat"));
  };

  const handleReadAllNotificatino = () => {};

  const handleReadNotification = () => {};

  const handleError = () => {};

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
