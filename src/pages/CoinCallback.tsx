import CheckIcon from "@/assets/icons/check.svg?url";
import { Button } from "../common/Button";
import { Link } from "react-router-dom";

export const CoinCallback = () => {
  const path = sessionStorage.getItem("Redirect_PATH") ?? "/";

  return (
    <div className="w-full h-full flex flex-col justify-between ">
      <div className="flex flex-col flex-1 gap-3 items-center justify-center">
        <img src={CheckIcon} alt="check_icon" />
        <span className="text-success-strong text-2xl font-bold leading-[34px] tracking-[-0.48px]">
          결제를 완료했어요!
        </span>
      </div>

      <div className="w-full px-4 py-2.5">
        <Link to={`${path}`} replace>
          <Button variant="primary">이전 페이지로 가기</Button>
        </Link>
      </div>
    </div>
  );
};
