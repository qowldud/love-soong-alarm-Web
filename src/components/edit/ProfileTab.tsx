import { Input } from "../../common/Input";
import { OptionButton } from "../profileOnboarding/OptionButton";
import { SectionHeader } from "../profileOnboarding/SectionHeader";
import { Button } from "../../common/Button";
import { useEditProfileStore } from "../../store/EditProfileState";
import { useApi } from "../../api/api";
import type { ChangeEvent } from "react";
import { toast } from "react-toastify";

const GENDER_OPTIONS = [
  { label: "남성", value: "MALE" },
  { label: "여성", value: "FEMALE" },
] as const;

export const ProfileTab = () => {
  const {
    emoji,
    nickname,
    gender,
    birthDate,
    major,
    setMajor,
    setEmoji,
    setNickname,
    setGender,
    setBirthDate,
    isModified,
    toPayload,
    initialize,
  } = useEditProfileStore();

  const { putData } = useApi();

  const isFilled =
    emoji && nickname && gender && major && birthDate && birthDate.length === 4;

  const handleEdit = async () => {
    const payload = toPayload(true);
    const clientPayload = toPayload(false);
    try {
      const res = await putData("/api/users/me", payload);
      if (res.success) {
        toast.success("수정 완료 되었습니다.", {
          autoClose: 1000,
        });
        initialize(clientPayload);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onChangeEmoji = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const emojiOnly = value.replace(
      /[^\p{Emoji}\p{Extended_Pictographic}]/gu,
      ""
    );

    setEmoji(emojiOnly);
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-1 min-h-0 flex-col px-4 overflow-y-auto pb-40">
        <SectionHeader title="필수 프로필" className="pt-4 pb-2.5" />

        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col pt-2">
            <Input
              label="나를 표현하는 이모티콘"
              placeholder="예시) 🥰"
              value={emoji}
              maxLength={2}
              onChange={onChangeEmoji}
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
                  select={option.value === gender}
                  onClick={() => setGender(option.value)}
                />
              ))}
            </div>

            <div className="py-2">
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
            </div>

            <Input
              label="학과(혹은 학부)"
              placeholder="예시) 컴퓨터학부"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              onClear={() => setMajor("")}
            />
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 max-w-[444px] w-full flex flex-col bg-white shadow-dim-weak backdrop-blur-40 pt-5.5 px-5 pb-2.5 rounded-xl">
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
