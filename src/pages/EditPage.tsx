import { useState } from "react";
import { Header } from "../common/Header";
import { RailTab } from "../common/RailTab";
import { ProfileTab } from "../components/edit/ProfileTab";
import { InterestTab } from "../components/edit/InterestTab";
import { useQuery } from "@tanstack/react-query";
import { useEditProfileStore } from "../store/EditProfileState";
import { useApi } from "../api/api";
import { useEffect } from "react";
import { INTEREST_OPTIONS } from "../constants/interests";
import type { Interest, UserProfile } from "../types/User";

export const EditPage = () => {
  const [selectedTab, setSelectedTab] = useState("프로필");
  const [editTabs, setEditTabs] = useState([
    { label: "프로필" },
    {
      label: "취향 1",
      chip: "",
    },
    {
      label: "취향 2",
      chip: "",
    },
  ]);
  const initialize = useEditProfileStore((state) => state.initialize);
  const original = useEditProfileStore((state) => state.original);
  const { getData } = useApi();

  const { data } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => getData<UserProfile>("/api/users/me"),
  });

  const getChipFromInterest = (interest?: Interest) => {
    if (!interest) return;

    const match = INTEREST_OPTIONS.find((opt) => opt.label === interest.label);
    if (!match) return undefined;
    return `${match.emoji} ${match.label}`;
  };

  useEffect(() => {
    if (data?.data) {
      const user = data.data;
      initialize({
        nickname: user.name,
        gender: user.gender,
        birthDate: Number(user.birthDate),
        major: user.major,
        emoji: user.emoji,
        interests: user.interests,
      });

      setEditTabs([
        { label: "프로필" },
        {
          label: "취향 1",
          chip: getChipFromInterest(user.interests[0]) ?? "",
        },
        {
          label: "취향 2",
          chip:
            user.interests.length > 1
              ? getChipFromInterest(user.interests[1]) ?? ""
              : "",
        },
      ]);
    }
  }, [data]);

  useEffect(() => {
    if (original) {
      initialize({
        ...original,
        birthDate: Number(original.birthDate),
      });
    }
  }, [selectedTab]);

  return (
    <div className="h-full flex flex-col">
      <Header title="프로필 수정" />
      <RailTab
        tabs={editTabs}
        selectedTab={selectedTab}
        onChange={setSelectedTab}
      />

      <div className="h-full">
        {selectedTab === "프로필" && <ProfileTab />}
        {selectedTab === "취향 1" && <InterestTab index={0} />}
        {selectedTab === "취향 2" && <InterestTab index={1} />}
      </div>
    </div>
  );
};
