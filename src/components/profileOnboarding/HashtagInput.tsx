import { useRef, useState } from "react";
import { Chip } from "./Chip";
import CloseIcon from "@/assets/icons/close.svg?url";

export const HashtagInput = () => {
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const ContainerRef = useRef<HTMLDivElement>(null);

  const addHashtag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !hashtags.includes(trimmed) && hashtags.length < 2) {
      setHashtags([...hashtags, trimmed]);
      setInputValue("");
    }
  };

  const removeHashtag = (tag: string) => {
    setHashtags(hashtags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      addHashtag();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 py-2.5">
      {hashtags.map((tag) => (
        <Chip
          key={tag}
          variant="detail"
          label={tag}
          removable={true}
          handleRemove={() => removeHashtag(tag)}
          className="!text-additive font-medium" // 왜 ! 안써주면 안 덮히는지 의문..
        />
      ))}

      {hashtags.length < 2 && (
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
  );
};
