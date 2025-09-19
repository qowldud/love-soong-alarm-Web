import { create } from "zustand";
import type { RecentMessage } from "../types/chat";

type MessageStore = {
  newMessage: RecentMessage[];
  setNewMessage: (args: { item: RecentMessage }) => void;
};

export const useMessageStore = create<MessageStore>()((set) => ({
  newMessage: [],
  setNewMessage: ({ item }) =>
    set((s) => ({ newMessage: [...s.newMessage, item] })),
}));
