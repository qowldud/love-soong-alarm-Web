import ErrorIcon from "@/assets/icons/error.svg?url";

export const OutOfBoundsNotice = () => {
  return (
    <div className="flex flex-col gap-3 w-full h-full items-center justify-center">
      <img src={ErrorIcon} alt="error_icon" />
      <span className="text-danger-strong text-2xl font-bold leading-[34px] tracking-[-0.48px]">
        숭실대를 벗어났어요!
      </span>

      <span className="text-center text-additive text-base font-medium leading-[28.8px] tracking-[-0.48px]">
        "좋아하는 숭리는"은 위치 구현 및 개인정보 보호를 위해 <br />
        숭실대 안에서만 사용할 수 있어요.
      </span>
    </div>
  );
};
