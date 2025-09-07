import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HomeState {
  checkProfile: boolean;
  checkAlarm: boolean;
  checkChat: boolean;

  setReset: (branch?: "profile" | "alarm" | "chat") => void;
  setCheckProfile: (flag: boolean) => void;
  setCheckAlarm: (flag: boolean) => void;
  setCheckChat: (flag: boolean) => void;
}

export const useHomeStore = create<HomeState>()(
  persist(
    (set) => ({
      checkProfile: false,
      checkAlarm: false,
      checkChat: false,

      setReset: (branch) => {
        switch (branch) {
          case "profile":
            set({ checkProfile: false });
            return;
          case "alarm":
            set({ checkAlarm: false });
            return;
          case "chat":
            set({ checkChat: false });
            return;
          default:
            set({ checkProfile: false, checkAlarm: false, checkChat: false });
            return;
        }
      },

      setCheckProfile: (flag) => {
        set({ checkProfile: false, checkAlarm: false, checkChat: false });
        set({ checkProfile: flag });
      },
      setCheckAlarm: (flag: boolean) => {
        set({ checkProfile: false, checkAlarm: false, checkChat: false });
        set({ checkAlarm: flag });
      },
      setCheckChat: (flag: boolean) => {
        set({ checkProfile: false, checkAlarm: false, checkChat: false });
        set({ checkChat: flag });
      },
    }),
    {
      name: "home-store",
      partialize: (state) => ({
        checkProfile: state.checkProfile,
        checkAlarm: state.checkAlarm,
        checkChat: state.checkChat,
      }),
    }
  )
);
