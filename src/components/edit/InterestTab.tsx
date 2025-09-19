import { SectionHeader } from "../profileOnboarding/SectionHeader";
import { Chip } from "../profileOnboarding/Chip";
import { Divider } from "../../common/Divider";
import { ChipStack } from "../profileOnboarding/ChipStack";
import { HashtagInput } from "../profileOnboarding/HashtagInput";
import { Button } from "../../common/Button";
import { INTEREST_OPTIONS } from "../../constants/interests";
import { GENRE_OPTIONS } from "../../constants/genres";
import { useEditProfileStore } from "../../store/EditProfileState";
import { useApi } from "../../api/api";

interface InterestTabProps {
  index: number;
}

const getInterestValueFromLabel = (label: string | null) => {
  const matched = INTEREST_OPTIONS.find((item) => item.label === label);
  return matched?.value;
};

const getGenreValueFromLabel = (
  interestLabel: string | null,
  genreLabel: string | null
) => {
  const interestValue = getInterestValueFromLabel(interestLabel);
  if (!interestValue) return;

  const genres = GENRE_OPTIONS[interestValue];
  const matched = genres?.find((g) => g.label === genreLabel);
  return matched?.value;
};

export const InterestTab = ({ index }: InterestTabProps) => {
  const interest = useEditProfileStore((state) => state.interests[index]);
  const setInterstAt = useEditProfileStore((state) => state.setInterestAt);
  const toPayload = useEditProfileStore((state) => state.toPayload);
  const isModified = useEditProfileStore((state) => state.isModified);
  const initialize = useEditProfileStore((state) => state.initialize);

  const { putData } = useApi();

  const interestValue = getInterestValueFromLabel(interest.label);
  const genreValue = getGenreValueFromLabel(
    interest.label,
    interest.detailLabel
  );

  const genres =
    interestValue !== undefined ? GENRE_OPTIONS[interestValue] || [] : [];

  const isFilled =
    interest.label && interest.hashTags.length > 0 && interest.detailLabel;

  const handleSelectInterest = (label: string) => {
    setInterstAt(index, {
      label,
      detailLabel: "",
      hashTags: [],
    });
  };

  const handleGenreClick = (genre: string) => {
    if (interest.detailLabel === genre) {
      setInterstAt(index, {
        ...interest,
        detailLabel: "",
        hashTags: [],
      });
    } else {
      setInterstAt(index, {
        ...interest,
        detailLabel: genre,
        hashTags: [],
      });
    }
  };

  const handleHashTagChange = (tags: string[]) => {
    setInterstAt(index, {
      ...interest,
      hashTags: tags,
    });
  };

  const handleEdit = async () => {
    if (!interest.label || !interest.detailLabel) return;

    const payload = toPayload(true);
    const not_convert_payload = toPayload(false);
    console.log(payload);
    try {
      const res = await putData("/api/users/me", payload);
      if (res.success) {
        console.log("수정성공");
        initialize(not_convert_payload);
      }
    } catch (err) {
      console.error(err);
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
                selected={interest.label === option.label}
                label={`${option.emoji} ${option.label}`}
                onClick={() => handleSelectInterest(option.label)}
              />
            ))}
          </div>
        </div>

        {interest.label && (
          <>
            {" "}
            <Divider />
            <SectionHeader title="자세한 취향 분류" />
            <ChipStack>
              {genres.map((genre) => (
                <Chip
                  key={genre.label}
                  variant="detail"
                  selected={interest.detailLabel === genre.label}
                  label={genre.label}
                  onClick={() => handleGenreClick(genre.label)}
                />
              ))}
            </ChipStack>
            {interest.detailLabel &&
              interestValue !== undefined &&
              genreValue !== undefined && (
                <HashtagInput
                  interest={interestValue}
                  interestDetail={genreValue}
                  value={interest.hashTags}
                  onChange={handleHashTagChange}
                />
              )}
          </>
        )}
      </div>

      <div className="absolute bottom-0 max-w-[444px] w-full flex flex-col bg-white shadow-dim-weak backdrop-blur-40 pt-5.5 px-5 pb-2.5 rounded-xl">
        <Button
          variant={isModified() && isFilled ? "primary" : "disabled"}
          disabled={!isModified() || !isFilled}
          type="button"
          onClick={handleEdit}
        >
          수정하기
        </Button>
      </div>
    </div>
  );
};
