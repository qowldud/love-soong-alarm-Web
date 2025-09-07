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
        </div>
      </div>

      <div className="mb-8 px-4 py-2.5 flex flex-col gap-2">
        <Button>다음으로</Button>
        <div className="px-1 pt-0.5 text-assistive text-xs font-normal text-center">
          "시작하기" 버튼을 통해 서비스를 시작하였을 경우,
          <span className="text-additive font-bold underline">약관의 내용</span>
          을 모두 읽고 이를 충분히 이해하였으며, 그 적용에 동의한 것으로 봅니다.
        </div>
      </div>
    </div>
  );
};
