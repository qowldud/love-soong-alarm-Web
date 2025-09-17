import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Interest {
  label: string;
  detailLabel: string;
  hashTags: string[];
}

interface OnboardingState {
  emoji: string;
  nickname: string;
  gender: "MALE" | "FEMALE" | null;
  birthDate: string;
  major: string;

  interests: Interest[];

  currentLabels: string[];
  currentLabel: string | null;
  currentDetail: string | null;
  currentHashtags: string[];

  setEmoji: (emoji: string) => void;
  setNickname: (nickname: string) => void;
  setGender: (gender: "MALE" | "FEMALE") => void;
  setBirthDate: (year: string) => void;
  setMajor: (department: string) => void;

  setCurrentLabels: (labels: string[]) => void;
  setCurrentLabel: (label: string | null) => void;
  setCurrentDetail: (detail: string | null) => void;
  setCurrentHashtags: (hashtags: string[]) => void;

  addCurrentInterest: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      emoji: "",
      nickname: "",
      gender: null,
      birthDate: "",
      major: "",

      interests: [],

      currentLabels: [],
      currentLabel: null,
      currentDetail: null,
      currentHashtags: [],

      setEmoji: (emoji) => set({ emoji }),
      setNickname: (nickname) => set({ nickname }),
      setGender: (gender) => set({ gender }),
      setBirthDate: (birthDate) => set({ birthDate }),
      setMajor: (major) => set({ major }),

      setCurrentLabels: (labels) => set({ currentLabels: labels }),
      setCurrentLabel: (label) => set({ currentLabel: label }),
      setCurrentDetail: (detail) => set({ currentDetail: detail }),
      setCurrentHashtags: (hashtags) => set({ currentHashtags: hashtags }),

      addCurrentInterest: () => {
        const { currentLabel, currentDetail, currentHashtags, interests } =
          get();

        if (!currentLabel || !currentDetail || currentHashtags.length === 0)
          return;

        const newInterest: Interest = {
          label: currentLabel,
          detailLabel: currentDetail,
          hashTags: currentHashtags,
        };

        set({
          interests: [...interests, newInterest],
          currentLabel: null,
          currentDetail: null,
          currentHashtags: [],
        });
      },
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
