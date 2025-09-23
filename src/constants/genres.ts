export const GENRE_OPTIONS: Record<string, { label: string; value: string }[]> =
  {
    MUSIC: [
      { label: "밴드", value: "BAND" },
      { label: "힙합", value: "HIPHOP" },
      { label: "케이팝", value: "KPOP" },
      { label: "클래식", value: "CLASSICAL" },
    ],
    MEDIA: [
      { label: "영화", value: "MOVIE" },
      { label: "드라마", value: "DRAMA" },
      { label: "예능", value: "ENTERTAINMENT" },
      { label: "다큐멘터리", value: "DOCUMENTARY" },
    ],
    GAME: [
      { label: "모바일게임", value: "MOBILE_GAME" },
      { label: "콘솔게임", value: "CONSOLE_GAME" },
      { label: "PC게임", value: "PC_GAME" },
    ],
    EXERCISE: [
      { label: "러닝", value: "RUNNING" },
      { label: "헬스", value: "FITNESS" },
      { label: "클라이밍", value: "CLIMBING" },
      { label: "격투기", value: "MMA" },
      { label: "보드", value: "BOARD" },
      { label: "기타 운동", value: "ETC_SPORTS" },
    ],
    SPORTS: [
      { label: "KBO", value: "KBO" },
      { label: "K리그", value: "KLEAGUE" },
      { label: "해외축구", value: "OVERSEAS_SOCCER" },
      { label: "e스포츠", value: "ESPORTS" },
      { label: "KBL", value: "KBL" },
      { label: "V-리그", value: "V_LEAGUE" },
      { label: "F1", value: "F1" },
    ],
    READING: [
      { label: "소설", value: "NOVEL" },
      { label: "시집", value: "POETRY" },
      { label: "웹소설", value: "WEBNOVEL" },
      { label: "기타", value: "ETC_READING" },
    ],
    FASHION: [
      { label: "서브컬쳐", value: "SUBCULTURE" },
      { label: "클래식", value: "FASHION_CLASSIC" },
      { label: "빈티지", value: "VINTAGE" },
      { label: "스트릿", value: "STREET" },
    ],
    LIFESTYLE: [
      { label: "맛집탐방", value: "RESTAURANT" },
      { label: "사진", value: "PICTURE" },
      { label: "DIY", value: "DIY" },
      { label: "요리", value: "COOKING" },
    ],
    TRAVELING: [
      { label: "국내여행", value: "DOMESTIC_TRAVEL" },
      { label: "해외여행", value: "INTERNATIONAL_TRAVEL" },
      { label: "캠핑", value: "CAMPING" },
    ],
  };

export const GENRE_FLAT_OPTIONS: { label: string; value: string }[] = [
  // MUSIC
  { label: "밴드", value: "BAND" },
  { label: "힙합", value: "HIPHOP" },
  { label: "케이팝", value: "KPOP" },
  { label: "클래식", value: "CLASSICAL" },

  // MEDIA
  { label: "영화", value: "MOVIE" },
  { label: "드라마", value: "DRAMA" },
  { label: "예능", value: "ENTERTAINMENT" },
  { label: "다큐멘터리", value: "DOCUMENTARY" },

  // GAME
  { label: "모바일게임", value: "MOBILE_GAME" },
  { label: "콘솔게임", value: "CONSOLE_GAME" },
  { label: "PC게임", value: "PC_GAME" },

  // EXERCISE
  { label: "러닝", value: "RUNNING" },
  { label: "헬스", value: "FITNESS" },
  { label: "클라이밍", value: "CLIMBING" },
  { label: "격투기", value: "MMA" },
  { label: "보드", value: "BOARD" },
  { label: "기타 운동", value: "ETC_SPORTS" },

  // SPORTS
  { label: "KBO", value: "KBO" },
  { label: "K리그", value: "KLEAGUE" },
  { label: "해외축구", value: "OVERSEAS_SOCCER" },
  { label: "e스포츠", value: "ESPORTS" },
  { label: "KBL", value: "KBL" },
  { label: "V-리그", value: "V_LEAGUE" },
  { label: "F1", value: "F1" },

  // READING
  { label: "소설", value: "NOVEL" },
  { label: "시집", value: "POETRY" },
  { label: "웹소설", value: "WEBNOVEL" },
  { label: "기타", value: "ETC_READING" },

  // FASHION
  { label: "서브컬쳐", value: "SUBCULTURE" },
  { label: "캐주얼", value: "CASUAL" },
  { label: "빈티지", value: "VINTAGE" },
  { label: "스트릿", value: "STREET" },

  // LIFESTYLE
  { label: "맛집탐방", value: "RESTAURANT" },
  { label: "사진", value: "PICTURE" },
  { label: "DIY", value: "DIY" },
  { label: "요리", value: "COOKING" },

  // TRAVELING
  { label: "국내여행", value: "DOMESTIC_TRAVEL" },
  { label: "해외여행", value: "INTERNATIONAL_TRAVEL" },
  { label: "캠핑", value: "CAMPING" },
];
