import { useNavigate } from "react-router-dom";
import Kakao from "@/assets/icons/ic_kakao.svg";
import { useAuthStore } from "../store/authStore";
import { useChatStore } from "../store/chatStore";
import { Button } from "../common/Button";

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

export const ReachMaxModal = () => {
  const navigate = useNavigate();
  const setReachMax = useChatStore((state) => state.setReachMax);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="absolute inset-0 z-10 flex items-center justify-center"
        onClick={() => setReachMax(false)}
      >
        <div className="w-[444px] h-full bg-black/30" />
      </div>

      <div className="relative z-20 flex flex-col rounded-2xl py-1 bg-white">
        <div className="flex flex-col px-5 py-4">
          <div className="text-xs text-assistive font-light">
            채팅 슬롯 부족
          </div>
          <div className="text-xl text-content-base font-bold">
            현재 최대 채팅 가능 인원은 1명이에요
          </div>
          <div className="text-base text-additive">
            채팅 슬롯을 잠금해제하고 더 많은 사람과 대화해보세요!
          </div>
        </div>
        <div className="flex flex-row px-4 py-2.5 gap-x-2">
          <Button
            variant="secondary"
            children="닫기"
            onClick={() => setReachMax(false)}
          />
          <Button
            variant="primary"
            children="잠금해제"
            onClick={() => navigate("/coin")}
          />
        </div>
      </div>
    </div>
  );
};
