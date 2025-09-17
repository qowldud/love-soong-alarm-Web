import { Button } from "../../common/Button";
import { Chip } from "../../components/profileOnboarding/Chip";
import { Header } from "../../common/Header";

import { Description } from "../../components/profileOnboarding/Description";
import { ProgressBar } from "../../components/profileOnboarding/ProgressBar";
import { Link } from "react-router-dom";
import { useOnboardingStore } from "../../store/onboardingStore";
import { INTEREST_OPTIONS } from "../../constants/interests";

export const Onboarding_Interests = () => {
  const { currentLabels, setCurrentLabels } = useOnboardingStore();

  const handleSelect = (value: string) => {
    if (currentLabels.includes(value)) {
      setCurrentLabels(currentLabels.filter((item) => item !== value));
    } else {
      if (currentLabels.length >= 2) return;
      setCurrentLabels([...currentLabels, value]);
    }
  };

  const isFilled = currentLabels.length;

  return (
    <div className="h-full flex flex-col justify-between relative">
      <div className="flex flex-col">
        <Header title="60% 작성 완료" />
        <ProgressBar per="60%" />

        <Description title="내 취향 2개를 선택해주세요">
          이 정보를 바탕으로 운명의 이성이 매치돼요!
        </Description>

        <div className="flex justify-center">
          <div
            className="px-4 py-2.5 flex flex-wrap gap-2 w-full"
            // style={{
            //   gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
            // }}
          >
            {INTEREST_OPTIONS.map((option) => (
              <Chip
                key={option.value}
                variant="interest"
                selected={currentLabels.includes(option.value)}
                label={option.label}
                onClick={() => handleSelect(option.value)}
                className="justify-center"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full mb-8 px-4 py-2.5 absolute bottom-0 bg-white">
        <Link to="/onboarding/preference/0">
          <Button variant={isFilled ? "primary" : "disabled"}>다음으로</Button>
        </Link>
      </div>
    </div>
  );
};
