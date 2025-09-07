import { useState } from "react";
import { SectionHeader } from "../profileOnboarding/SectionHeader";
import { Chip } from "../profileOnboarding/Chip";
import { Divider } from "../../common/Divider";
import { ChipStack } from "../profileOnboarding/ChipStack";
import { HashtagInput } from "../profileOnboarding/HashtagInput";
import { Button } from "../../common/Button";

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

const genres = [
  { label: "밴드", value: "밴드" },
  { label: "힙합", value: "힙합" },
  { label: "케이팝", value: "케이팝" },
  { label: "클래식", value: "클래식" },
];

export const Interest2Tab = () => {
  const [selectedInterests, setSelectedInterests] = useState<string | null>(
    null
  );
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    if (selectedInterests === value) {
      setSelectedInterests(null);
    } else {
      setSelectedInterests(value);
    }
  };

  const handleGenreClick = (genre: string) => {
    if (selectedGenre === genre) {
      setSelectedGenre(null);
    } else {
      setSelectedGenre(genre);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col px-4">
        <SectionHeader title="취향 대분류" className="pt-4 pb-2.5" />

        <div className="flex justify-center">
          <div
            className="py-2.5 grid gap-2 justify-center w-full"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(65px, 1fr))",
            }}
          >
            {INTEREST_OPTIONS.map((option) => (
              <Chip
                key={option.value}
                variant="interest"
                selected={selectedInterests === option.value}
                label={option.label}
                className="w-full justify-center"
                onClick={() => handleSelect(option.value)}
              />
            ))}
          </div>
        </div>

        <Divider />

        <SectionHeader title="자세한 취향 분류" />
        <ChipStack>
          {genres.map((genre) => (
            <Chip
              variant="detail"
              selected={selectedGenre === genre.value}
              label={genre.label}
              onClick={() => handleGenreClick(genre.value)}
            />
          ))}
        </ChipStack>

        <Divider />

        <SectionHeader
          title="취향 해시태그"
          subTitle="10자 이내로 작성해주세요"
        />

        <HashtagInput />
      </div>

      <div className="absolute bottom-0 max-w-[444px] w-full px-4 flex flex-col bg-white pb-8 shadow-dim-weak backdrop-blur-40">
        <div className="w-full pt-2.5 pb-0.5"></div>
        <div className="py-2.5">
          <Button variant="primary">수정하기</Button>
        </div>
      </div>
    </div>
  );
};
