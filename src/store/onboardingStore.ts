import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface OnboardingState {
  emoji: string;
  nickname: string;
  gender: "남성" | "여성" | null;
  birthYear: string;
  department: string;

  interests: string[];
  interestDetail: string | null;
  hashtags: string[];

  // 개별 함수 업데이트
  setEmoji: (emoji: string) => void;
  setNickname: (nickname: string) => void;
  setGender: (gender: "남성" | "여성") => void;
  setBirthYear: (year: string) => void;
  setDepartment: (department: string) => void;

  setInterests: (interests: string[]) => void;
  setInterestDetail: (detail: string | null) => void;
  setHashtags: (hashtags: string[]) => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      emoji: "",
      nickname: "",
      gender: null,
      birthYear: "",
      department: "",

      interests: [],
      interestDetail: null,
      hashtags: [],

      setEmoji: (emoji: string) => set({ emoji }),
      setNickname: (nickname: string) => set({ nickname }),
      setGender: (gender: "남성" | "여성") => set({ gender }),
      setBirthYear: (birthYear: string) => set({ birthYear }),
      setDepartment: (department: string) => set({ department }),

      setInterests: (interests: string[]) => set({ interests }),
      setInterestDetail: (detail: string | null) =>
        set({ interestDetail: detail }),
      setHashtags: (hashtags: string[]) => set({ hashtags }),
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
