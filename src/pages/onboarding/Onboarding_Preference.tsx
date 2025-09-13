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

export const Onboarding_Preference = () => {
  const { step } = useParams();
  const navigate = useNavigate();
  const { interests, interestDetail, setInterestDetail, hashtags } =
    useOnboardingStore();

  const currentStep = Number(step || 0);
  const currentInterest = interests[currentStep];
  const genres = GENRE_OPTIONS[currentInterest] || [];

  const handleGenreClick = (genre: string) => {
    if (interestDetail === genre) {
      setInterestDetail(null);
    } else {
      setInterestDetail(genre);
    }
  };

  const isFilled = !!(interestDetail && hashtags.length > 0);
  const isLast = currentStep === interests.length - 1;

  const handleNext = () => {
    if (!isFilled) return;

    if (isLast) {
      // 시작하기(온보딩 api) 호출
    } else {
      navigate("/onboarding/preference/1");
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col">
        <Header title="80% 작성 완료" />
        <ProgressBar per="80%" />

        <Description
          title="휴멸님의 음악 취향에 대해 알려주세요"
          subTitle="더 자세히 적을수록 나와 맞는 소울메이트가 찾아와요!"
        />

        <div className="px-4">
          <SectionHeader title="자세한 취향 분류" />
          <ChipStack>
            {genres.map((genre) => (
              <Chip
                variant="detail"
                selected={interestDetail === genre.value}
                label={genre.label}
                onClick={() => handleGenreClick(genre.value)}
              />
            ))}
          </ChipStack>

          {interestDetail && (
            <HashtagInput
              interest={currentInterest}
              interestDetail={interestDetail}
            />
          )}
        </div>
      </div>

      <div className="mb-8 px-4 py-2.5 flex flex-col gap-2">
        <Button
          variant={isFilled ? "primary" : "disabled"}
          onClick={handleNext}
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
