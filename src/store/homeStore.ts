import { create } from "zustand";

interface HomeState {
  checkProfile: boolean;
  checkChat: boolean;
  isNoticeAlarm: boolean;
  isChatAlarm: boolean;

  setReset: (branch?: "profile" | "chat") => void;
  setCheckProfile: (flag: boolean) => void;
  setCheckChat: (flag: boolean) => void;
  setIsNoticeAlarm: (flag: boolean) => void;
  setIsChatAlarm: (flag: boolean) => void;
}

export const useHomeStore = create<HomeState>()((set) => ({
  checkProfile: false,
  checkChat: false,
  isNoticeAlarm: false,
  isChatAlarm: false,

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
  setIsNoticeAlarm: (flag: boolean) => {
    set({ isNoticeAlarm: flag });
  },
  setIsChatAlarm: (flag: boolean) => {
    set({ isChatAlarm: flag });
  },
}));
