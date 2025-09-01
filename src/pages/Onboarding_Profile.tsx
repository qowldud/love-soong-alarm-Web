import { useState } from "react";
import { Header } from "../common/Header";
import { Input } from "../common/Input";
import { OptionButton } from "../components/Onboarding/OptionButton";
import { ProgressBar } from "../components/Onboarding/ProgressBar";
import { Button } from "../common/Button";
import { Description } from "../components/Onboarding/Description";

const GENDER_OPTIONS = ["남성", "여성"];

export const Onboarding_Profile = () => {
  const [select, setSelect] = useState<string | null>(null);
  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <Header title="30% 작성 완료" />
        <ProgressBar per="30%" />

        <Description
          title="필수 프로필을 입력해주세요"
          subTitle="이곳은 누구나 볼 수 있는 프로필이에요."
        />

        <div className="flex flex-col px-4 py-2 gap-4">
          <div className="flex flex-col">
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

            <div className="px-4 py-2 flex gap-2">
              {GENDER_OPTIONS.map((option) => (
                <OptionButton
                  label={option}
                  select={select === option}
                  onClick={() => setSelect(option)}
                />
              ))}
            </div>
          </div>

          <div className="py-2">
            <span className="px-1 pb-2 text-sm text-additive font-medium">
              생년월일
            </span>
          </div>
        </div>
      </div>

      <div className="py-2.5 mb-8 px-4">
        <Button>다음</Button>
      </div>
    </div>
  );
};
