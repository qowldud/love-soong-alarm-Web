import { Button } from "../common/Button";
import { Header } from "../common/Header";

export const Test = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <Header title="프로필 수정" />
        <Button variant="secondary">건너뛰기</Button>
      </div>
    </div>
  );
};
