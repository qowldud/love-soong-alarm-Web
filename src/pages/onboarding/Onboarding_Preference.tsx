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

export const Onboarding_Preference = () => {
  const { step } = useParams();
  const navigate = useNavigate();
  const {
    currentLabels,
    setCurrentLabel,
    currentDetail,
    currentHashtags,
    setCurrentDetail,
    addCurrentInterest,
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
      if (data.success) {
        navigate("/splash");
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

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col">
        <Header title="80% 작성 완료" />
        <ProgressBar per="80%" />

        <Description title="휴멸님의 음악 취향에 대해 알려주세요">
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
                onClick={() => setCurrentDetail(genre.value)}
              />
            ))}
          </ChipStack>

          {currentDetail && (
            <HashtagInput interest={label} interestDetail={currentDetail} />
          )}
        </div>
      </div>

      <div className="mb-8 px-4 py-2.5 flex flex-col gap-2">
        <Button
          variant={isFilled ? "primary" : "disabled"}
          onClick={handleNext}
          type="button"
        >
          {isLast ? "시작하기" : "다음으로"}
        </Button>
        {isFilled && isLast && (
          <div className="px-1 pt-0.5 text-assistive text-xs font-normal text-center">
            "시작하기" 버튼을 통해 서비스를 시작하였을 경우,
            <Link to={"/term"} className="text-additive font-bold underline">
              약관의 내용
            </Link>
            을 모두 읽고 이를 충분히 이해하였으며, 그 적용에 동의한 것으로
            봅니다.
          </div>
        )}
      </div>
    </div>
  );
};
