import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ChatStore {
  excessChat: boolean;
  reachMax: boolean;
  ignoreUser: boolean;

  setReset: () => void;
  setExcessChat: (flag: boolean) => void;
  setReachMax: (flag: boolean) => void;
  setIgnoreUser: (flag: boolean) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      excessChat: false,
      reachMax: false,
      ignoreUser: false,

      setReset: () => {
        set({ excessChat: false, ignoreUser: false });
      },

      setExcessChat: (flag) => {
        set({ excessChat: false, reachMax: false, ignoreUser: false });
        set({ excessChat: flag });
      },
      setReachMax: (flag) => {
        set({ excessChat: false, reachMax: false, ignoreUser: false });
        set({ reachMax: flag });
      },
      setIgnoreUser: (flag: boolean) => {
        set({ excessChat: false, reachMax: false, ignoreUser: false });
        set({ ignoreUser: flag });
      },
    }),
    {
      name: "chat-store",
      partialize: (state) => ({
        excessChat: state.excessChat,
        reachMax: state.reachMax,
        ignoreUser: state.ignoreUser,
      }),
    }
  )
);
