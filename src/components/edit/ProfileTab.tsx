import { useState } from "react";
import { Input } from "../../common/Input";
import { OptionButton } from "../profileOnboarding/OptionButton";
import { SectionHeader } from "../profileOnboarding/SectionHeader";
import { Button } from "../../common/Button";

const GENDER_OPTIONS = ["남성", "여성"];

export const ProfileTab = () => {
  const [select, setSelect] = useState<string | null>(null);
  return (
    <div className="h-full flex flex-col overflow-y-auto justify-between relative">
      <div className="flex flex-col">
        <SectionHeader title="필수 프로필" className="pt-4 pb-2.5" />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col pt-2">
            <Input label="나를 표현하는 이모티콘" placeholder="예시) 🥰" />
            <div className="px-1 py-2.5 text-assistive text-xs font-normal">
              키보드에서 이모티콘을 자유롭게 입력해주세요!
            </div>
          </div>

          <Input label="닉네임" placeholder="예시) 김숭실" />

          <div className="flex flex-col gap-3">
            <span className="px-1 text-content-base text-sm font-normal">
              성별
            </span>

            <div className="flex gap-2">
              {GENDER_OPTIONS.map((option) => (
                <OptionButton
                  label={option}
                  select={select === option}
                  onClick={() => setSelect(option)}
                />
              ))}
            </div>

            <div className="py-2">
              <span className="px-1 pb-2 text-sm text-additive font-medium">
                생년월일
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 max-w-[444px] w-full flex flex-col bg-white pb-8">
        <div className="w-full pt-2.5 pb-0.5"></div>
        <div className="py-2.5">
          <Button variant="primary">수정하기</Button>
        </div>
      </div>
    </div>
  );
};
