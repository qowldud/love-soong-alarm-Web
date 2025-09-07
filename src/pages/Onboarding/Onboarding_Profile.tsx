import { useState } from "react";
import { Header } from "../../common/Header";
import { ProgressBar } from "../../components/profileOnboarding/ProgressBar";
import { Description } from "../../components/profileOnboarding/Description";
import { Input } from "../../common/Input";
import { Button } from "../../common/Button";
import { OptionButton } from "../../components/profileOnboarding/OptionButton";
import { Link } from "react-router-dom";

const GENDER_OPTIONS = ["남성", "여성"];

export const Onboarding_Profile = () => {
  const [select, setSelect] = useState<string | null>(null);
  return (
    <div className="flex flex-col h-full relative">
      <div>
        <Header title="30% 작성 완료" />
        <ProgressBar per="30%" />
      </div>

      <div className="overflow-y-auto pb-35 scrollbar-none">
        <Description
          title="필수 프로필을 입력해주세요"
          subTitle="이곳은 누구나 볼 수 있는. 프로필이에요."
        />

        <div className="flex flex-col px-4 py-2 gap-4 ">
          <div className="flex flex-col">
            <Input
              label="나를 표현하는 이모티콘"
              placeholder="예시) 🥰"
              maxLength={1}
            />
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

            <Input
              label="(선택) 학과(혹은 학부)"
              placeholder="예시) 컴퓨터학부"
            />
          </div>
        </div>
      </div>

      <div className="w-full pt-2.5 pb-10.5 px-4 flex flex-col gap-2 absolute bottom-0 bg-white">
        <Link to="/onboarding/interests">
          <Button>다음</Button>
        </Link>

        <span className="text-center text-assistive text-xs font-normal">
          필수 정보들을 입력해야 다음으로 넘어갈 수 있어요.
        </span>
      </div>
    </div>
  );
};
