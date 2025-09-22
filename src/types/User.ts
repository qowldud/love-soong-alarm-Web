export interface User {
  id: number;
  name: string;
  age: number;
  major: string;
  emoji: string;
  lastSeen: string;
  interests: {
    detailLabel: string;
    hashTags: string[];
  }[];
}

export interface UserProfile {
  name: string;
  birthDate: number;
  major: string;
  emoji: string;
  gender: "MALE" | "FEMALE";
  interests: {
    label: string;
    detailLabel: string;
    hashTags: string[];
  }[];
}

export interface NormalizedProfile {
  name: string;
  age: number;
  major: string;
  emoji: string;
  gender?: "MALE" | "FEMALE";
  lastSeen?: string;
  interests: {
    label: string;
    detailLabel: string;
    hashTags: string[];
  }[];
}

export interface NearbyUserMarker {
  userId: number;
  name: string;
  age: number;
  major: string;
  emoji: string;
  interests: {
    detailLabel: string;
    hashTags: string[];
  }[];
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
