import { Header } from "../../common/Header";
import { ProgressBar } from "../../components/profileOnboarding/ProgressBar";
import { Description } from "../../components/profileOnboarding/Description";
import { Input } from "../../common/Input";
import { Button } from "../../common/Button";
import { OptionButton } from "../../components/profileOnboarding/OptionButton";
import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "../../store/onboardingStore";
import type { ChangeEvent } from "react";
import mixpanel from "mixpanel-browser";
import { checkDuplicate } from "../../api/auth";
import { toast } from "react-toastify";

const GENDER_OPTIONS = [
  { label: "남성", value: "MALE" },
  { label: "여성", value: "FEMALE" },
] as const;

export const Onboarding_Profile = () => {
  const navigate = useNavigate();
  const {
    emoji,
    nickname,
    gender,
    major,
    birthDate,
    setEmoji,
    setNickname,
    setGender,
    setMajor,
    setBirthDate,
  } = useOnboardingStore();

  const isFilled =
    emoji && nickname && gender && major && birthDate && birthDate.length === 4;

  const onChangeEmoji = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const emojiOnly = value.replace(
      /[^\p{Emoji}\p{Extended_Pictographic}]/gu,
      ""
    );

    setEmoji(emojiOnly);
  };

  const onClickNext = async () => {
    const res = await checkDuplicate(nickname);

    if (res?.data.available) {
      mixpanel.track("Profile_Create", {
        profile_completion_pct: 30,
      });
      navigate("/onboarding/interests");
    } else {
      toast.error("사용 불가한 닉네임입니다.");
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      <div>
        <Header
          title="30% 작성 완료"
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        />
        <ProgressBar per="30%" />
      </div>

      <div className="overflow-y-auto pb-35 scrollbar-none">
        <Description title="필수 프로필을 입력해주세요">
          이곳은 누구나 볼 수 있는 프로필이에요.
        </Description>

        <div className="flex flex-col px-4 py-2 gap-4 ">
          <div className="flex flex-col">
            <Input
              type="text"
              label="나를 표현하는 이모티콘"
              placeholder="예시) 🥰"
              value={emoji}
              onChange={onChangeEmoji}
              maxLength={2}
              onClear={() => setEmoji("")}
            />
            <div className="px-1 pt-2.5 text-assistive text-xs font-normal">
              키보드에서 이모티콘을 자유롭게 입력해주세요!
            </div>
          </div>

          <Input
            label="닉네임"
            placeholder="예시) 김숭실"
            value={nickname}
            onClear={() => setNickname("")}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 10) {
                setNickname(value);
              } else {
                setNickname(value.slice(0, 10));
              }
            }}
            maxLength={10}
          />

          <div className="flex flex-col gap-3">
            <span className="px-1 text-content-base text-sm font-normal">
              성별
            </span>

            <div className="flex gap-2">
              {GENDER_OPTIONS.map((option) => (
                <OptionButton
                  key={option.label}
                  label={option.label}
                  select={gender === option.value}
                  onClick={() => setGender(option.value)}
                />
              ))}
            </div>
          </div>

          <Input
            label="출생연도"
            placeholder="예시) 2006"
            value={birthDate}
            onClear={() => setBirthDate("")}
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/\D/g, "");
              if (onlyNums.length <= 4) {
                setBirthDate(onlyNums);
              }
            }}
            maxLength={4}
            inputMode="numeric"
          />

          <Input
            label="학과(혹은 학부)"
            placeholder="예시) 컴퓨터학부"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            onClear={() => setMajor("")}
          />
        </div>
      </div>

      <div className="w-full pb-2.5 pt-5.5 px-4 flex flex-col gap-2 absolute bottom-0 bg-white shadow-dim-weak backdrop-blur-40 rounded-xl safe-bottom">
        <Button
          variant={isFilled ? "primary" : "disabled"}
          onClick={onClickNext}
        >
          다음
        </Button>

        {!isFilled && (
          <span className="text-center text-assistive text-xs font-normal">
            필수 정보들을 입력해야 다음으로 넘어갈 수 있어요.
          </span>
        )}
      </div>
    </div>
  );
};
