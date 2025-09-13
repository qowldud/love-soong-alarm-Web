import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HomeState {
  checkProfile: boolean;
  checkChat: boolean;

  setReset: (branch?: "profile" | "chat") => void;
  setCheckProfile: (flag: boolean) => void;
  setCheckChat: (flag: boolean) => void;
}

export const useHomeStore = create<HomeState>()(
  persist(
    (set) => ({
      checkProfile: false,
      checkChat: false,

      setReset: (branch) => {
        switch (branch) {
          case "profile":
            set({ checkProfile: false });
            return;
          case "chat":
            set({ checkChat: false });
            return;
          default:
            set({ checkProfile: false, checkChat: false });
            return;
        }
      },

      setCheckProfile: (flag) => {
        set({ checkProfile: false, checkChat: false });
        set({ checkProfile: flag });
      },
      setCheckChat: (flag: boolean) => {
        set({ checkProfile: false, checkChat: false });
        set({ checkChat: flag });
      },
    }),
    {
      name: "home-store",
      partialize: (state) => ({
        checkProfile: state.checkProfile,
        checkChat: state.checkChat,
      }),
    }
  )
);
