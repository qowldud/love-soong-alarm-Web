import { Button } from "../../common/Button";
import { Header } from "../../common/Header";
import { Input } from "../../common/Input";
import { Description } from "../../components/profileOnboarding/Description";
import { ProgressBar } from "../../components/profileOnboarding/ProgressBar";

export const Onboarding_Extra = () => {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col ">
        <Header title="40% 작성 완료" />
        <ProgressBar per="40%" />
        <Description title="선택 정보를 입력해주세요">
          이 정보는 입력하고 싶지 않으면 건너뛰어도 괜찮아요.
        </Description>

        <div className="flex flex-col px-4 py-2 gap-4">
          <Input label="키" placeholder="예시) 165cm" />
          <Input label="학과 (혹은 학부)" placeholder="예시) 컴퓨터학부" />
        </div>
      </div>

      <div className="flex flex-col py-2.5 px-4 mb-8 gap-2">
        <Button>입력 완료</Button>
        <Button variant="secondary">건너뛰기</Button>
      </div>
    </div>
  );
};
