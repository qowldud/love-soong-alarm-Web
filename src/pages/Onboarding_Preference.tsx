import { Header } from "../common/Header";
import { ChipStack } from "../components/Onboarding/ChipStack";
import { Description } from "../components/Onboarding/Description";
import { ProgressBar } from "../components/Onboarding/ProgressBar";
import { SectionHeader } from "../components/Onboarding/SectionHeader";

export const Onboarding_Preference = () => {
  return (
    <div className="flex flex-col">
      <Header title="80% 작성 완료" />
      <ProgressBar per="80%" />

      <Description
        title="휴멸님의 음악 취향에 대해 알려주세요"
        subTitle="더 자세히 적을수록 나와 맞는 소울메이트가 찾아와요!"
      />

      <div className="px-4">
        <SectionHeader title="자세한 취향 분류" />
        <ChipStack></ChipStack>
      </div>
    </div>
  );
};
