import { Outlet } from "react-router-dom";
import { useWebSocket } from "../../hooks/useWebSocket";
import { useReliableSocket } from "../../hooks/useReliableSocket";

export interface SocketActions {
  handleEnter?: (chatRoomId: number) => void;
  handleExit?: (chatRoomId: number) => void;
  handleSend?: (chatRoomId: number, content: string) => void;
}

const SOCKET_URL = import.meta.env.VITE_WS_URL;

const urlFactory = () => {
  const token = localStorage.getItem("accessToken") || "";
  if (!token) return null;
  const base = SOCKET_URL?.startsWith("wws")
    ? SOCKET_URL
    : SOCKET_URL?.replace(/^http/, "ws");
  return `${base}?token=${encodeURIComponent(token)}`;
};

export const SocketLayout = () => {
  const {
    handleConnectionSuccess,
    handleUnreadBadgeUpdate,
    handleMessageRead,
    handleSubscribe,
    handleUnsubscribe,
    handleChatMessage,
    handleChatListUpdate,
    handleError,
  } = useWebSocket();

  const { sendMessage } = useReliableSocket(urlFactory, {
    onOpen: () => console.log("✅ WebSocket 연결됨"),
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
        case "CHAT_LIST_UPDATE":
          return handleChatListUpdate(data);
        case "ERROR":
          return handleError(data);
        default:
          return;
      }
    },
    onError: (e) => console.error("❌ WebSocket 에러:", e),
    onClose: () => console.log("⚠️ WebSocket 닫힘"),
  });

  const handleEnter = (chatRoomId: number) => {
    sendMessage({ type: "SUBSCRIBE", chatRoomId: chatRoomId });
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

  const ctx: SocketActions = { handleEnter, handleExit, handleSend };

  return <Outlet context={ctx} />;
};
