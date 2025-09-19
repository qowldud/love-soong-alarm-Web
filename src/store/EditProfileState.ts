import { create } from "zustand";
import { INTEREST_OPTIONS_EDIT } from "../constants/interests";
import { GENRE_OPTIONS } from "../constants/genres";

interface Interest {
  label: string;
  detailLabel: string;
  hashTags: string[];
}

const convertToServerInterests = (interests: Interest[]) => {
  return interests.map((interest) => {
    const labelObj = INTEREST_OPTIONS_EDIT.find(
      (opt) => opt.label === interest.label
    );
    const labelValue = labelObj?.value ?? "";

    const detailOptions = GENRE_OPTIONS[labelValue] ?? [];
    const detailObj = detailOptions.find(
      (opt) => opt.label === interest.detailLabel
    );
    const detailValue = detailObj?.value ?? "";

    return {
      label: labelValue,
      detailLabel: detailValue,
      hashTags: interest.hashTags,
    };
  });
};

interface EditProfileState {
  emoji: string;
  nickname: string;
  gender: "MALE" | "FEMALE" | null;
  birthDate: string;
  major: string;
  interests: Interest[];

  original: {
    emoji: string;
    nickname: string;
    gender: "MALE" | "FEMALE";
    birthDate: string;
    major: string;
    interests: Interest[];
  } | null;

  isModified: () => boolean;

  initialize: (data: {
    emoji: string;
    nickname: string;
    gender: "MALE" | "FEMALE";
    birthDate: number;
    major: string;
    interests: Interest[];
  }) => void;

  setEmoji: (emoji: string) => void;
  setNickname: (name: string) => void;
  setGender: (gender: "MALE" | "FEMALE") => void;
  setBirthDate: (year: string) => void;
  setMajor: (department: string) => void;
  setInterestAt: (index: number, value: Interest) => void;

  toPayload: (convert: boolean) => {
    emoji: string;
    nickname: string;
    gender: "MALE" | "FEMALE";
    birthDate: number;
    major: string;
    interests: Interest[];
  };
}

export const useEditProfileStore = create<EditProfileState>((set, get) => ({
  emoji: "",
  nickname: "",
  gender: null,
  birthDate: "",
  major: "",
  interests: [],
  original: null,

  initialize: (data) => {
    const isSingleInterest = data.interests.length === 1;

    const initialInterest = isSingleInterest
      ? [...data.interests, { label: "", detailLabel: "", hashTags: [] }]
      : data.interests;

    set({
      emoji: data.emoji,
      nickname: data.nickname,
      gender: data.gender,
      birthDate: data.birthDate.toString(),
      major: data.major,
      interests: initialInterest,
      original: {
        emoji: data.emoji,
        nickname: data.nickname,
        gender: data.gender,
        birthDate: data.birthDate.toString(),
        major: data.major,
        interests: initialInterest,
      },
    });
  },

  setEmoji: (emoji) => set({ emoji }),
  setNickname: (nickname) => set({ nickname }),
  setGender: (gender) => set({ gender }),
  setBirthDate: (birthDate) => set({ birthDate }),
  setMajor: (major) => set({ major }),

  isModified: () => {
    const state = get();
    const { original } = state;
    if (!original) return false;

    return (
      state.emoji !== original.emoji ||
      state.nickname !== original.nickname ||
      state.gender !== original.gender ||
      state.birthDate !== original.birthDate ||
      state.major !== original.major ||
      JSON.stringify(state.interests) !== JSON.stringify(original.interests)
    );
  },

  setInterestAt: (index, value) =>
    set((state) => {
      const newInterests = [...state.interests];
      newInterests[index] = value;
      return { interests: newInterests };
    }),

  toPayload: (convert?: boolean) => {
    const { emoji, nickname, gender, birthDate, major, interests } = get();
    if (gender === null) {
      throw new Error("Gender must be MALE or FEMALE");
    }

    const filtered = interests.filter(
      (interest) =>
        interest.label && interest.detailLabel && interest.hashTags.length > 0
    );

    return {
      emoji,
      nickname,
      gender,
      birthDate: Number(birthDate),
      major,
      interests: convert ? convertToServerInterests(filtered) : filtered,
    };
  },
}));
