import { useRef } from "react";
import { Outlet } from "react-router-dom";
import { useWebSocket } from "../../hooks/useWebSocket";
import { useReliableSocket } from "../../hooks/useReliableSocket";

export interface SocketActions {
  handlePlainType?: (type: string, chatRoomId: number) => void;
  handleEnter?: (chatRoomId: number) => void;
  handleBlock?: (chatRoomId: number) => void;
  handleUnblock?: (chatRoomId: number) => void;
  handleSendSubscribeList?: () => void;
  handleSendUnsubscribeList?: () => void;
  handleExit?: (chatRoomId: number) => void;
  handleSend?: (chatRoomId: number, content: string) => void;
}

const SOCKET_URL = import.meta.env.VITE_WS_URL;

const urlFactory = () => {
  const token = localStorage.getItem("accessToken");
  if (!token || !SOCKET_URL) return null;

  let base = SOCKET_URL.trim();

  if (base.startsWith("wws://")) base = "wss://" + base.slice(6);
  if (base.startsWith("http://")) base = "ws://" + base.slice(7);
  else if (base.startsWith("https://")) base = "wss://" + base.slice(8);

  return `${base}?token=${encodeURIComponent(token)}`;
};

export const SocketLayout = () => {
  const activeRoomsRef = useRef<Set<number>>(new Set());

  const {
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
  } = useWebSocket();

  const { sendMessage } = useReliableSocket(urlFactory, {
    onOpen: () => {
      for (const id of activeRoomsRef.current) {
        sendMessage({ type: "SUBSCRIBE", chatRoomId: id });
      }
    },

    onMessage: (data) => {
      switch (data.type) {
        case "CONNECTION_SUCCESS":
          return handleConnectionSuccess();
        case "UNREAD_BADGE_UPDATE":
          return handleUnreadBadgeUpdate(data);
        case "SUBSCRIBE":
          return handleSubscribe();
        case "UNSUBSCRIBE":
          return handleUnsubscribe();
        case "MESSAGE_READ":
          return handleMessageRead();
        case "CHAT_MESSAGE":
          return handleChatMessage();
        case "MESSAGE_COUNT_LIMIT":
          return handleExcessChat();
        case "CHAT_LIST_UPDATE":
          return handleChatListUpdate(data);
        case "CHAT_LIST_SUBSCRIBE":
          return handleSubscribeList();
        case "CHAT_LIST_UNSUBSCRIBE":
          return handleUnsubscribeList();
        case "NEW_CHAT_ROOM_CREATED":
          return handleNewUserChat();
        case "BLOCK_USER":
          return handleBlockUser();
        case "UNBLOCK_USER":
          return handleUnblockUser();
        case "NOTIFICATION":
          return handleNotification();
        case "UNREAD_NOTIFICATION_BADGE_UPDATE":
          return handleNotifiactionAlarm(data);
        case "READ_NOTIFICATION":
          return handleReadNotification();
        case "READ_ALL_NOTIFICATION":
          return handleReadAllNotificatino();
        case "ERROR":
          return handleError();
        default:
          return;
      }
    },

    onError: () => {},
    onClose: () => {},
  });

  const handlePlainType = (type: string, chatRoomId: number) => {
    sendMessage({ type: type, chatRoomId: chatRoomId });
  };

  const handleEnter = (chatRoomId: number) => {
    sendMessage({ type: "SUBSCRIBE", chatRoomId: chatRoomId });
  };

  const handleBlock = (chatRoomId: number) => {
    sendMessage({ type: "BLOCK_USER", chatRoomId: chatRoomId });
  };

  const handleUnblock = (chatRoomId: number) => {
    sendMessage({ type: "UNBLOCK_USER", chatRoomId: chatRoomId });
  };

  const handleSendSubscribeList = () => {
    sendMessage({ type: "CHAT_LIST_SUBSCRIBE" });
  };

  const handleSendUnsubscribeList = () => {
    sendMessage({ type: "CHAT_LIST_UNSUBSCRIBE" });
  };

  const handleExit = (chatRoomId: number) => {
    sendMessage({
      type: "UNSUBSCRIBE",
      chatRoomId: chatRoomId,
    });
  };

  const handleSend = (chatRommId: number, content: string) => {
    sendMessage({
      type: "MESSAGE_SEND",
      chatRoomId: chatRommId,
      content: content,
    });
  };

  const ctx: SocketActions = {
    handlePlainType,
    handleEnter,
    handleBlock,
    handleUnblock,
    handleSendSubscribeList,
    handleSendUnsubscribeList,
    handleExit,
    handleSend,
  };

  return <Outlet context={ctx} />;
};
