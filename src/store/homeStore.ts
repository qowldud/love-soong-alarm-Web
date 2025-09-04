import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HomeState {
  checkProfile: string | null;
  checkAlarm: boolean;
  checkChat: boolean;

  setCheckProfile: (id: string) => void;
  setCheckAlaram: (flag: boolean) => void;
  setCheckChat: (flag: boolean) => void;
}

export const useHomeStore = create<HomeState>()(
  persist(
    (set) => ({
      checkProfile: null,
      checkAlarm: false,
      checkChat: false,

      setCheckProfile: (id: string | null) => {
        set({ checkProfile: id });
      },
      setCheckAlaram: (flag: boolean) => {
        set({ checkAlarm: flag });
      },
      setCheckChat: (flag: boolean) => {
        set({ checkChat: flag });
      },
    }),
    {
      name: "home-store",
      partialize: (state) => ({}),
    }
  )
);
