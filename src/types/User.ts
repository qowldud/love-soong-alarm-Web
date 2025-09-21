export interface UserInterest {
  detailLabel: string;
  hashTags: string[];
}

export interface User {
  userId: number;
  name: string;
  age: number;
  major: string;
  emoji: string;
  interests: UserInterest[];
  lastSeen: string | null;
  isMatching: boolean;
  latitude: number;
  longitude: number;
}

export interface Interest {
  label: string;
  detailLabel: string;
  hashTags: string[];
}

export interface UserProfile {
  name: string;
  birthDate: number;
  major: string;
  emoji: string;
  gender: "MALE" | "FEMALE";
  interests: Interest[];
}
