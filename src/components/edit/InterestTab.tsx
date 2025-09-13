import { useState } from "react";
import { SectionHeader } from "../profileOnboarding/SectionHeader";
import { Chip } from "../profileOnboarding/Chip";
import { Divider } from "../../common/Divider";
import { ChipStack } from "../profileOnboarding/ChipStack";
import { HashtagInput } from "../profileOnboarding/HashtagInput";
import { Button } from "../../common/Button";
import { INTEREST_OPTIONS } from "../../constants/interests";
import { GENRE_OPTIONS } from "../../constants/genres";

export const InterestTab = () => {
  const [selectedInterests, setSelectedInterests] = useState<string | null>(
    null
  );
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const genres = selectedInterests
    ? GENRE_OPTIONS[selectedInterests] || []
    : [];

  const handleSelect = (value: string) => {
    setSelectedInterests(value);
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
          <div className="py-2.5 flex flex-wrap gap-2 w-full">
            {INTEREST_OPTIONS.map((option) => (
              <Chip
                key={option.value}
                variant="interest"
                selected={selectedInterests === option.value}
                label={option.label}
                onClick={() => handleSelect(option.value)}
              />
            ))}
          </div>
        </div>

        {selectedInterests && (
          <>
            {" "}
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
            {selectedGenre && (
              <HashtagInput
                interest={selectedInterests}
                interestDetail={selectedGenre}
              />
            )}
          </>
        )}
      </div>

      {/* zustand 해시태그 저장하면서 해시태그 있을때 보이도록 추후 수정 */}
      {selectedInterests && selectedGenre && (
        <div className="absolute bottom-0 max-w-[444px] w-full px-4 flex flex-col bg-white pb-8 shadow-dim-weak backdrop-blur-40">
          <div className="w-full pt-2.5 pb-0.5"></div>
          <div className="py-2.5">
            <Button variant="primary">수정하기</Button>
          </div>
        </div>
      )}
    </div>
  );
};
