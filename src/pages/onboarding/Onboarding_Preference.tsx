import { Header } from "../../common/Header";
import { Chip } from "../../components/profileOnboarding/Chip";
import { ChipStack } from "../../components/profileOnboarding/ChipStack";
import { Description } from "../../components/profileOnboarding/Description";
import { ProgressBar } from "../../components/profileOnboarding/ProgressBar";
import { SectionHeader } from "../../components/profileOnboarding/SectionHeader";
import { Button } from "../../common/Button";
import { HashtagInput } from "../../components/profileOnboarding/HashtagInput";
import { useOnboardingStore } from "../../store/onboardingStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GENRE_OPTIONS } from "../../constants/genres";
import { useEffect } from "react";
import { useApi } from "../../api/api";
import { INTEREST_OPTIONS } from "../../constants/interests";
import { useAuthStore } from "../../store/authStore";

export const Onboarding_Preference = () => {
  const { step } = useParams();
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const {
    nickname,
    currentLabels,
    setCurrentLabel,
    currentDetail,
    currentHashtags,
    setCurrentDetail,
    addCurrentInterest,
    setCurrentHashtags,
    reset,
  } = useOnboardingStore();

  const currentStep = Number(step || 0);
  const isLast = currentStep === currentLabels.length - 1;
  const label = currentLabels[currentStep];
  const genres = GENRE_OPTIONS[label] || [];

  useEffect(() => {
    setCurrentLabel(label);
  }, [label]);

  const isFilled = !!(currentDetail && currentHashtags.length > 0);

  const { patchData } = useApi();

  const sendOnboarding = async () => {
    const state = useOnboardingStore.getState();

    const payload = {
      nickname: state.nickname,
      major: state.major,
      birthDate: Number(state.birthDate),
      gender: state.gender,
      emoji: state.emoji,
      interests: state.interests,
    };

    try {
      const data = await patchData("/api/users/on-boarding", payload);
      const accessToken = localStorage.getItem("accessToken");
      if (data.success && accessToken) {
        reset();
        sessionStorage.removeItem("onboarding-storage");
        login(accessToken);
        navigate("/guide");
      } else {
        console.log("accessToken이 없습니다.");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleNext = () => {
    if (!isFilled) return;
    addCurrentInterest();

    if (isLast) {
      // api 연동
      sendOnboarding();
    } else {
      navigate(`/onboarding/preference/${currentStep + 1}`);
    }
  };

  const changeValueToLabel = (value: string) => {
    const match = INTEREST_OPTIONS.find((option) => option.value === value);
    return match?.label;
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col">
        <Header title="80% 작성 완료" />
        <ProgressBar per="80%" />

        <Description
          title={`${nickname}님의 ${changeValueToLabel(
            label
          )} 취향에 대해 알려주세요`}
        >
          더 자세히 적을수록 나와 맞는 소울메이트가 찾아와요!
        </Description>

        <div className="px-4">
          <SectionHeader title="자세한 취향 분류" />
          <ChipStack>
            {genres.map((genre) => (
              <Chip
                key={genre.label}
                variant="detail"
                selected={currentDetail === genre.value}
                label={genre.label}
                onClick={() => {
                  setCurrentDetail(genre.value);
                  setCurrentHashtags([]);
                }}
              />
            ))}
          </ChipStack>

          {currentDetail && (
            <HashtagInput
              interest={label}
              interestDetail={currentDetail}
              value={currentHashtags}
              onChange={(tags) => setCurrentHashtags(tags)}
            />
          )}
        </div>
      </div>

      <div className="px-4 pb-2.5 pt-5.5 flex flex-col gap-2 shadow-dim-weak backdrop-blur-40 rounded-xl">
        <Button
          variant={isFilled ? "primary" : "disabled"}
          onClick={handleNext}
          type="button"
        >
          {isLast ? "완료하기" : "다음으로"}
        </Button>
        {isFilled && isLast && (
          <div className="px-1 pt-0.5 text-assistive text-xs font-normal text-center">
            "다음" 버튼을 통해 서비스를 시작하였을 경우,
            <Link to={"/term"} className="text-additive font-bold underline">
              약관의 내용
            </Link>
            을 모두 읽고 이를 충분히 이해하였으며, 개인정보 수집∙이용에 동의한
            것으로 봅니다. (동의를 거부할 권리가 있으며, 동의 거부시에는 서비스
            이용이 제한됩니다.)
          </div>
        )}
      </div>
    </div>
  );
};
