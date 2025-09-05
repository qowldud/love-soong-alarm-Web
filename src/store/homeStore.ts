import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HomeState {
  checkProfile: boolean;
  checkAlarm: boolean;
  checkChat: boolean;

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
