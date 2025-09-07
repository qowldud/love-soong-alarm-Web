import { create } from "zustand";

interface OnboardingState {
  emoji: string;
  nickname: string;
  gender: "남성" | "여성" | null;
  birthYear: string;
  department: string;

  interests: string[];
  interestDetail: string;
  hashtags: string[];

  // 개별 함수 업데이트
  setEmoji: (emoji: string) => void;
  setNickname: (nickname: string) => void;
  setGender: (gender: "남성" | "여성") => void;
  setBirthYear: (year: string) => void;
  setDepartment: (department: string) => void;

  setInterests: (interests: string[]) => void;
  setInterestDetail: (detail: string) => void;
  setHashtags: (hashtags: string[]) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  emoji: "",
  nickname: "",
  gender: null,
  birthYear: "",
  department: "",

  interests: [],
  interestDetail: "",
  hashtags: [],

  setEmoji: (emoji) => set({ emoji }),
  setNickname: (nickname) => set({ nickname }),
  setGender: (gender) => set({ gender }),
  setBirthYear: (birthYear) => set({ birthYear }),
  setDepartment: (department) => set({ department }),

  setInterests: (interests) => set({ interests }),
  setInterestDetail: (detail) => set({ interestDetail: detail }),
  setHashtags: (hashtags) => set({ hashtags }),
}));
