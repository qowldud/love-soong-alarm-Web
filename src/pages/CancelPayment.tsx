import { Button } from "../common/Button";
import { Link } from "react-router-dom";
import ErrorIcon from "@/assets/icons/error.svg?url";

export const CancelPayment = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between ">
      <div className="flex flex-col flex-1 gap-3 items-center justify-center">
        <img src={ErrorIcon} alt="error_icon" />
        <span className="text-danger-strong text-2xl font-bold leading-[34px] tracking-[-0.48px]">
          결제에 실패했어요
        </span>
        <span className="text-additive text-base font-medium leading-[28.8px] tracking-[-0.48px]">
          결제 취소, 결제수단 실패등으로 결제에 실패했어요.
        </span>
      </div>

      <div className="w-full px-4 py-2.5">
        <Link to="/">
          <Button variant="primary">홈으로 가기</Button>
        </Link>
      </div>
    </div>
  );
};
