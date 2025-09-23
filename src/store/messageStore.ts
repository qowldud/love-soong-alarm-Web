import { create } from "zustand";
import type { ChatRoom, RecentMessage } from "../types/chat";
import type { ListUpdate, NewChatUpdate } from "../types/socket";

type MessageStore = {
  newMessage: RecentMessage[];
  newChats: ChatRoom[];

  chatDetailMessages: RecentMessage[];
  setInitMessages: (messages: RecentMessage[]) => void;
  prependMessages: (messages: RecentMessage[]) => void;
  appendMessage: (message: RecentMessage) => void;

  setNewMessage: (args: { item: RecentMessage }) => void;
  setInitLists: ({ chatRooms }: { chatRooms: ChatRoom[] }) => void;
  setReadMessage: () => void;
  setNewChats: ({ newChat }: { newChat: ListUpdate }) => void;
  setNewUsers: ({ newUser }: { newUser: NewChatUpdate }) => void;
};

export const useMessageStore = create<MessageStore>()((set) => ({
  newMessage: [],
  newChats: [],
  chatDetailMessages: [],

  setNewMessage: ({ item }) =>
    set((s) => ({ newMessage: [...s.newMessage, item] })),

  setInitLists: ({ chatRooms }) => set({ newChats: chatRooms }),

  setReadMessage: () =>
    set((s) => {
      const updatedChats = [...s.newChats];
      for (let i = updatedChats.length - 1; i >= 0; i--) {
        updatedChats[i] = {
          ...updatedChats[i],
          lastMessageInfo: {
            ...updatedChats[i].lastMessageInfo,
            isRead: true,
          },
        };
      }
      return { newChats: updatedChats };
    }),

  setNewChats: ({ newChat }: { newChat: ListUpdate }) =>
    set((s) => {
      const idx = s.newChats.findIndex(
        (r) => r.chatRoomId === newChat.chatRoomId
      );

      const updatedLast = {
        content: newChat.lastMessageContent,
        timestamp: newChat.timestamp,
        isSentByMe: newChat.isMyMessage,
        isRead: newChat.isRead,
      };

      if (idx === -1) {
        return { newChats: s.newChats };
      }

      const updatedRoom: ChatRoom = {
        ...s.newChats[idx],
        lastMessageInfo: updatedLast,
      };

      return {
        newChats: [
          updatedRoom,
          ...s.newChats.slice(0, idx),
          ...s.newChats.slice(idx + 1),
        ],
      };
    }),

  setNewUsers: ({ newUser }: { newUser: NewChatUpdate }) =>
    set((s) => {
      const idx = s.newChats.findIndex(
        (r) => r.chatRoomId === newUser.chatRoomId
      );

      const emptyLast = {
        content: "",
        timestamp: newUser.createdAt ?? "",
        isSentByMe: false,
        isRead: false,
      };

      if (idx === -1) {
        const newRoom: ChatRoom = {
          chatRoomId: newUser.chatRoomId,
          emoji: newUser.partnerEmoji ?? "💬",
          partnerNickname: newUser.partnerNickname ?? "새 대화",
          lastMessageInfo: emptyLast,
        };
        return { newChats: [newRoom, ...s.newChats] };
      }

      const updatedRoom: ChatRoom = {
        ...s.newChats[idx],
        emoji: newUser.partnerEmoji ?? s.newChats[idx].emoji ?? "💬",
        partnerNickname:
          newUser.partnerNickname ??
          s.newChats[idx].partnerNickname ??
          "새 대화",
      };

      return {
        newChats: [
          updatedRoom,
          ...s.newChats.slice(0, idx),
          ...s.newChats.slice(idx + 1),
        ],
      };
    }),

  setInitMessages: (messages) => set({ chatDetailMessages: messages }),

  prependMessages: (messages) =>
    set((s) => ({
      chatDetailMessages: [...messages, ...s.chatDetailMessages],
    })),

  appendMessage: (message) =>
    set((s) => ({ chatDetailMessages: [...s.chatDetailMessages, message] })),
}));
