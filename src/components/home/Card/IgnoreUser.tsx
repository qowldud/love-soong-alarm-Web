import { toast } from "react-toastify";
import { Button } from "../../../common/Button";
import { useChatStore } from "../../../store/chatStore";
import { CardHeader } from "../../Common";

export const IgnoreUser = () => {
  const setIgnoreUser = useChatStore((state) => state.setIgnoreUser);

  const handleIgnore = () => {
    toast.warn("준비중입니다.");
    setIgnoreUser(false);
  };

  return (
    <div className="relative">
      <CardHeader title="한시오분님을 차단할까요?" />

      <div className="flex flex-row gap-x-2 py-2.5 w-full">
        <Button
          variant="secondary"
          children="취소"
          onClick={() => setIgnoreUser(false)}
        />
        <Button
          variant="primary"
          children="차단하기"
          onClick={() => handleIgnore()}
        />
      </div>
    </div>
  );
};
