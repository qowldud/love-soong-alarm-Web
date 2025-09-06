import { useState } from "react";
import { Header } from "../../common/Header";
import { Chip } from "../../components/profileOnboarding/Chip";
import { ChipStack } from "../../components/profileOnboarding/ChipStack";
import { Description } from "../../components/profileOnboarding/Description";
import { ProgressBar } from "../../components/profileOnboarding/ProgressBar";
import { SectionHeader } from "../../components/profileOnboarding/SectionHeader";
import { Divider } from "../../common/Divider";
import { Button } from "../../common/Button";
import { HashtagInput } from "../../components/profileOnboarding/HashtagInput";

const genres = [
  { label: "밴드", value: "밴드" },
  { label: "힙합", value: "힙합" },
  { label: "케이팝", value: "케이팝" },
  { label: "클래식", value: "클래식" },
];

const recommendHashTags = [
  { label: "검정치마", value: "검정치마" },
  { label: "쏜애플", value: "쏜애플" },
  { label: "오아시스", value: "오아시스" },
  { label: "데이식스", value: "데이식스" },
  { label: "블러", value: "블러" },
  { label: "잔나비", value: "잔나비" },
];

export const Onboarding_Preference = () => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const handleGenreClick = (genre: string) => {
    if (selectedGenre === genre) {
      setSelectedGenre(null);
    } else {
      setSelectedGenre(genre);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col">
        <Header title="80% 작성 완료" />
        <ProgressBar per="80%" />

        <Description
          title="휴멸님의 음악 취향에 대해 알려주세요"
          subTitle="더 자세히 적을수록 나와 맞는 소울메이트가 찾아와요!"
        />

        <div className="px-4">
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

          <div className="pt-2 pb-1">
            <span className="px-0.5 text-additive text-sm font-normal">
              고르기 어렵다면, 추천 항목에서 골라봐요
            </span>
          </div>
          <ChipStack>
            {recommendHashTags.map((hashTag) => (
              <Chip
                variant="detail"
                label={hashTag.label}
                className="!text-additive font-medium"
              />
            ))}
          </ChipStack>
        </div>
      </div>

      <div className="mb-8 px-4 py-2.5 ">
        <Button>다음으로</Button>
      </div>
    </div>
  );
};
