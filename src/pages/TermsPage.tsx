import { useState } from "react";
import { Header } from "../common/Header";
import { RailTab } from "../common/RailTab";
import { TermsOfService } from "../components/term/TermsOfService";
import { LocationServiceTerms } from "../components/term/LocationServiceTerms";
import { PrivacyPolicy } from "../components/term/PrivacyPolicy";

const Tabs = [
  { label: "서비스이용약관" },
  { label: "위치기반서비스" },
  { label: "개인정보처리방침" },
];

export const TermsPage = () => {
  const [selected, setSelected] = useState("서비스이용약관");
  return (
    <div className="h-full flex flex-col safe-bottom">
      <Header title="이용약관" />
      <RailTab tabs={Tabs} selectedTab={selected} onChange={setSelected} />

      {selected === "서비스이용약관" && <TermsOfService />}
      {selected === "위치기반서비스" && <LocationServiceTerms />}
      {selected === "개인정보처리방침" && <PrivacyPolicy />}
    </div>
  );
};
