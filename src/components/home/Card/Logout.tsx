import { useAuthStore } from "../../../store/authStore";
import { CardHeader } from "../../Common";

export const LogoutCard = () => {
  const setLogout = useAuthStore((state) => state.setIsLogoutOpen);

  return (
    <div className="relative">
      <CardHeader title="로그아웃" />

      <div className="flex flex-col gap-y-1 px-5 py-4">
        <div className="text-content-base text-[20px] font-bold">
          정말 탈퇴하시나요?
        </div>
      </div>

      <div className="flex flex-row gap-x-2 px-4 py-2.5 w-full">
        <div
          className="flex py-4 w-[50%] rounded-[12px] bg-main3 text-main1 justify-center items-center cursor-pointer"
          onClick={() => setLogout(false)}
        >
          취소
        </div>
        <div className="flex py-4 w-[50%] rounded-[12px] bg-main1 text-white justify-center items-center cursor-pointer">
          로그아웃
        </div>
      </div>
    </div>
  );
};
