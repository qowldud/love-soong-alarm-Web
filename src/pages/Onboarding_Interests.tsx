import { Button } from "../common/Button";
import { Chip } from "../components/Onboarding/Chip";
import { Header } from "../common/Header";

import { Description } from "../components/Onboarding/Description";
import { ProgressBar } from "../components/Onboarding/ProgressBar";
import { useState } from "react";

const INTEREST_OPTIONS = [
  { label: "🎧 음악", value: "음악" },
  { label: "🎬 미디어", value: "미디어" },
  { label: "🎮 게임", value: "게임" },
  { label: "🏋🏻‍♂️ 운동", value: "운동" },
  { label: "⚽️ 스포츠", value: "스포츠" },
  { label: "📚 독서", value: "독서" },
  { label: "👔 패션", value: "패션" },
  { label: "🍔 식도락", value: "식도락" },
  { label: "✈️ 여행", value: "여행" },
];

export const Onboarding_Interests = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleSelect = (value: string) => {
    if (selectedInterests.includes(value)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== value));
    } else {
      if (selectedInterests.length >= 2) return;
      setSelectedInterests([...selectedInterests, value]);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-col">
        <Header title="60% 작성 완료" />
        <ProgressBar per="60%" />

        <Description
          title="내 취향 2개를 선택해주세요"
          subTitle="이 정보를 바탕으로 운명의 이성이 매치돼요!"
        />

        <div className="flex justify-center">
          <div
            className="px-4 py-2.5 grid gap-2 justify-center w-full"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(65px, 1fr))",
            }}
          >
            {INTEREST_OPTIONS.map((option) => (
              <Chip
                key={option.value}
                variant="interest"
                selected={selectedInterests.includes(option.value)}
                label={option.label}
                className="w-full justify-center"
                onClick={() => handleSelect(option.value)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mb-8 px-4 py-2.5">
        <Button>다음으로</Button>
      </div>
    </div>
  );
};
