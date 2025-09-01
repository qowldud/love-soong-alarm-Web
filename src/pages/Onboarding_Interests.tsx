import { Button } from "../common/Button";
import { Header } from "../common/Header";
import { Chip } from "../components/Onboarding/Chip";
import { Description } from "../components/Onboarding/Description";
import { ProgressBar } from "../components/Onboarding/ProgressBar";

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
          <div className="px-4 py-2.5 gap-2 flex flex-wrap">
            {INTEREST_OPTIONS.map((option) => (
              <Chip label={option.label} />
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
