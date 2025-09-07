import { useNavigate } from "react-router-dom";
import Kakao from "@/assets/icons/ic_kakao.svg";
import { useAuthStore } from "../store/authStore";

export const LoginModal = ({ type }: { type: "chat" | "edit" }) => {
  const navigate = useNavigate();
  const setIsModalOpen = useAuthStore((state) => state.setIsModalOpen);

  const CONST_LOGIN_TEXT = () => {
    if (type === "chat")
      return (
        <div>
          5초만에 시작하고
          <br />
          이분과 채팅하러 가볼까요?
        </div>
      );
    else {
      return (
        <div>
          5초만에 시작하고
          <br />내 취향 공유하러 가볼까요?
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="absolute inset-0 z-10 flex items-center justify-center"
        onClick={() => setIsModalOpen({ flag: false })}
      >
        <div className="w-[444px] h-full bg-black/30" />
      </div>

      <div className="relative z-20 flex flex-col gap-y-3.5 rounded-[16px] bg-white px-4.5 py-8 shadow-lg">
        <div className="text-[20px] font-semibold text-black px-3">
          {CONST_LOGIN_TEXT()}
        </div>
        <div
          className="flex flex-row gap-x-3.5 justify-center items-center bg-[#FDE500] rounded-[16px] py-4 px-12.5 cursor-pointer"
          onClick={() => navigate("/redirect")}
        >
          <img src={Kakao} alt={"kakao"} className="w-6.5 h-6.5" />
          <div className="text-[20px] font-semibold">카카오톡 간편 로그인</div>
        </div>
      </div>
    </div>
  );
};
