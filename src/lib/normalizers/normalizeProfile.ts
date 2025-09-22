import type { User, UserProfile } from "../../types/User";

export function normalizeProfile(
  data: User | UserProfile,
  type: "user" | "my"
) {
  if (type === "user") {
    const user = data as User;
    return {
      name: user.name,
      age: user.age,
      major: user.major,
      emoji: user.emoji,
      lastSeen: user.lastSeen,
      interests: user.interests.map((i) => ({
        label: "",
        detailLabel: i.detailLabel,
        hashTags: i.hashTags,
      })),
    };
  }

  const my = data as UserProfile;
  const currentYear = new Date().getFullYear();

  return {
    name: my.name,
    age: currentYear - my.birthDate + 1,
    major: my.major,
    emoji: my.emoji,
    gender: my.gender,
    interests: my.interests.map((i) => ({
      label: i.label,
      detailLabel: i.detailLabel,
      hashTags: i.hashTags,
    })),
  };
}
