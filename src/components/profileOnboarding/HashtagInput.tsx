import { useRef, useState } from "react";
import { Chip } from "./Chip";
import CloseIcon from "@/assets/icons/close.svg?url";
import { ChipStack } from "./ChipStack";
import { useOnboardingStore } from "../../store/onboardingStore";
import { HASHTAG_SUGGESTIONS } from "../../constants/hashtag_suggestions";
import { SectionHeader } from "./SectionHeader";
import { Divider } from "../../common/Divider";

interface Props {
  interest: string;
  interestDetail: string | null;
}

export const HashtagInput = ({ interest, interestDetail }: Props) => {
  const { currentHashtags, setCurrentHashtags } = useOnboardingStore();
  const [inputValue, setInputValue] = useState("");
  const ContainerRef = useRef<HTMLDivElement>(null);

  const hashtag_suggestions =
    interest && interestDetail
      ? (HASHTAG_SUGGESTIONS[interest as keyof typeof HASHTAG_SUGGESTIONS]?.[
          interestDetail as keyof (typeof HASHTAG_SUGGESTIONS)[keyof typeof HASHTAG_SUGGESTIONS]
        ] as { label: string; value: string }[]) ?? []
      : [];

  const addHashtag = () => {
    const trimmed = inputValue.trim();
    if (
      trimmed &&
      !currentHashtags.includes(trimmed) &&
      currentHashtags.length < 2
    ) {
      setCurrentHashtags([...currentHashtags, trimmed]);
      setInputValue("");
    }
  };

  const removeHashtag = (tag: string) => {
    setCurrentHashtags(currentHashtags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      addHashtag();
    }
  };

  const onClickHashTag = (tag: string) => {
    if (currentHashtags.length >= 2) return;
    setCurrentHashtags([...currentHashtags, tag]);
  };

  return (
    <>
      <Divider />
      <SectionHeader
        title="취향 해시태그"
        subTitle="10자 이내로 작성해주세요"
      />
      <div className="flex flex-wrap items-center gap-2 py-2.5">
        {currentHashtags.map((tag) => (
          <Chip
            key={tag}
            variant="detail"
            label={tag}
            removable={true}
            handleRemove={() => removeHashtag(tag)}
            className="!text-additive font-medium"
          />
        ))}

        {currentHashtags.length < 2 && (
          <div
            className="px-2 py-1.5 flex items-center gap-1 bg-fill-regular rounded-lg"
            ref={ContainerRef}
          >
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="#해시태그를_입력해주세요"
              className="outline-none text-sm font-medium placeholder:text-disabled text-additive px-0.5 w-[18ch]"
              onKeyDown={handleKeyDown}
              onBlur={addHashtag}
              maxLength={10}
            />

            <button
              className="size-5 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setInputValue("");
              }}
            >
              <img src={CloseIcon} alt="close_icon" />
            </button>
          </div>
        )}
      </div>

      <div className="pt-2 pb-1">
        <span className="px-0.5 text-additive text-sm font-normal">
          고르기 어렵다면, 추천 항목에서 골라봐요
        </span>
      </div>
      <ChipStack>
        {hashtag_suggestions.map((hashTag) => (
          <Chip
            key={hashTag.label}
            variant="detail"
            label={hashTag.label}
            className="!text-additive font-medium"
            onClick={() => onClickHashTag(hashTag.value)}
          />
        ))}
      </ChipStack>
    </>
  );
};
