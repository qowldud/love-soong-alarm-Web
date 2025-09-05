import { PROFILE_MOCK } from "./mocks";

export const AUTH_CONST = {
  input: {
    key: "input",
    title: `환영해요!<br/>간단하게 휴대폰 번호로 시작할게요`,
    label: "빠르게 나의 운명을 찾아 떠날 수 있어요!",
    placeholder: "- 없이 01000000000 형태로 입력해주세요",
    error: "올바르지 않은 형식이에요!",
  },
  valid: {
    key: "valid",
    title: `휴대폰 번호로 전송된<br/>인증 번호를 입력해주세요`,
    label: "",
    placeholder: "000000 형식이에요",
    error: "잘못된 인증번호를 입력하셨어요!",
  },
};

export const HOME_CONST = {
  no: {
    key: "no",
    title: `😢 아직 일치하는 이성이 없어요ㅠ`,
    label: "원래 찐사랑은 갑자기 나타나지 않아요..",
  },
  yes: {
    key: "yes",
    title: ["근처에 일치하는 이성이", "명 있어요"],
    label: "클릭하여 확인하기",
  },
};

export const HOME_PROFILE_CONST = {
  jo: {
    key: 1,
    emoji: "🌿",
    name: "조휴일",
    age: 20,
    dept: "경영학부",
    height: 182,
    category: PROFILE_MOCK,
  },
  kim: {
    key: 2,
    emoji: "🎧",
    name: "김숭실",
    age: 22,
    dept: "컴퓨터학부",
    height: 163,
    category: PROFILE_MOCK,
  },
};

export const CHAT_PROFILE_CONST = [
  {
    emoji: "🎧",
    name: "김숭실",
    recent: "긴 세월에 변하지 않을 그런 사랑 하면 되죠",
    time: "1시간 전",
    isRecent: true,
    isChecked: true,
  },
  {
    emoji: "💐",
    name: "한시오분",
    recent: "죄송해요 팀베이비 좋아하시는 여자분은 딱히... ",
    time: "2시간 전",
    isRecent: false,
    isChecked: false,
  },
  {
    emoji: "🥺",
    name: "링링",
    recent: "혹시 펫사 다니세요????",
    time: "5시간 전",
    isRecent: false,
    isChecked: true,
  },
];
