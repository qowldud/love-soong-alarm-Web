import Close from "@/assets/icons/ic_close.svg";
import { useAuthStore } from "../../../store/authStore";
import { Button } from "../../../common/Button";

const CONST_LOGIN_TEXT = ({ type }: { type: "chat" | "edit" }) => {
  if (type === "chat")
    return (
      <div>
        5초만에 계정 만들고,
        <br />이 분과 대화하러 갈까요?
      </div>
    );
  else {
    return (
      <div>
        5초만에 계정 만들고,
        <br />
        지금 내 취향 공유하세요!
      </div>
    );
  }
};

const Header = () => {
  const setLoginCard = useAuthStore((state) => state.setModalOpen);

  return (
    <>
      <button
        onClick={() => setLoginCard(false)}
        className="absolute right-0 top-0 rounded-full p-2 text-gray-500 hover:bg-gray-100"
        aria-label="닫기"
      />
      <div className="flex justify-between px-1 py-3.5">
        <div className="text-[24px] font-bold text-[#231D33]">로그인</div>
        <img
          src={Close}
          alt={"close"}
          onClick={() => setLoginCard(false)}
          className="cursor-pointer"
        />
      </div>
    </>
  );
};

export const LoginCard = () => {
  const loginType = useAuthStore((state) => state.loginType);
  return (
    <div className="relative">
      <Header />

      <div className="flex flex-col gap-y-1 px-5 py-4">
        <div className="text-base font-bold text-[20px]">
          {CONST_LOGIN_TEXT({ type: loginType })}
        </div>
        <div className="text-additive font-medium text-[16px]">
          대충 자극적인 멘트...
        </div>
      </div>

      <Button
        variant="primary"
        onClick={() =>
          (window.location.href = `${
            import.meta.env.VITE_BASE_URL
          }/oauth2/authorization/kakao`)
        }
      >
        카카오톡으로 로그인
      </Button>
    </div>
  );
};
