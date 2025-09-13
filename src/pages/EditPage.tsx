import { useState } from "react";
import { Header } from "../common/Header";
import { RailTab } from "../common/RailTab";
import { ProfileTab } from "../components/edit/ProfileTab";
import { InterestTab } from "../components/edit/InterestTab";

const EditTab = [
  { label: "프로필" },
  { label: "취향 1", chip: "🎧 음악" },
  { label: "취향 2", chip: "🎬 미디어" },
];

export const EditPage = () => {
  const [selectedTab, setSelectedTab] = useState("프로필");
  return (
    <div className="h-full flex flex-col">
      <Header title="프로필 수정" />
      <RailTab
        tabs={EditTab}
        selectedTab={selectedTab}
        onChange={setSelectedTab}
      />

      <div className="h-full">
        {selectedTab === "프로필" && <ProfileTab />}
        {selectedTab === "취향 1" && <InterestTab />}
        {selectedTab === "취향 2" && <InterestTab />}
      </div>
    </div>
  );
};
