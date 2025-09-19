export interface UserInterest {
  detailLabel: string;
  hashTags: string[];
}

export interface User {
  name: string;
  age: number;
  major: string;
  emoji: string;
  interests: UserInterest[];
  lastSeen: string;
  latitude: number;
  longitude: number;
}
