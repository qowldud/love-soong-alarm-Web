import { useRef } from "react";
import { Outlet } from "react-router-dom";
import { useWebSocket } from "../../hooks/useWebSocket";
import { useReliableSocket } from "../../hooks/useReliableSocket";
// import { toast } from "react-toastify";

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
      console.log("✅ WebSocket 연결됨");
      for (const id of activeRoomsRef.current) {
        sendMessage({ type: "SUBSCRIBE", chatRoomId: id });
      }
    },

    onMessage: (data) => {
      switch (data.type) {
        case "CONNECTION_SUCCESS":
          return handleConnectionSuccess(data);
        case "UNREAD_BADGE_UPDATE":
          return handleUnreadBadgeUpdate(data);
        case "SUBSCRIBE":
          return handleSubscribe(data);
        case "UNSUBSCRIBE":
          return handleUnsubscribe(data);
        case "MESSAGE_READ":
          return handleMessageRead(data);
        case "CHAT_MESSAGE":
          return handleChatMessage(data);
        case "MESSAGE_COUNT_LIMIT":
          return handleExcessChat(data);
        case "CHAT_LIST_UPDATE":
          return handleChatListUpdate(data);
        case "CHAT_LIST_SUBSCRIBE":
          return handleSubscribeList(data);
        case "CHAT_LIST_UNSUBSCRIBE":
          return handleUnsubscribeList(data);
        case "NEW_CHAT_ROOM_CREATED":
          return handleNewUserChat();
        case "BLOCK_USER":
          return handleBlockUser(data);
        case "UNBLOCK_USER":
          return handleUnblockUser(data);
        case "NOTIFICATION":
          return handleNotification(data);
        case "UNREAD_NOTIFICATION_BADGE_UPDATE":
          return handleNotifiactionAlarm(data);
        case "READ_NOTIFICATION":
          return handleReadNotification(data);
        case "READ_ALL_NOTIFICATION":
          return handleReadAllNotificatino(data);
        case "ERROR":
          return handleError(data);
        default:
          console.log(data);
          return;
      }
    },

    onError: (e) => console.error("❌ WebSocket 에러:", e),
    onClose: () => {},
    // toast.warn("WebSocket 닫힘"),
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
