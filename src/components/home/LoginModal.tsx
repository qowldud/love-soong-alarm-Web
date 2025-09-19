import { BlurBackground } from "../../common/BlurBackground";
import Kakao from "@/assets/icons/Kakao.svg?url";

export const LoginModal = () => {
  return (
    <BlurBackground>
      <div className="w-full bg-fill-static rounded-2xl py-0.5">
        <div className="w-full flex flex-col py-4 pl-5 pr-7 gap-0.5">
          <span className="text-assistive text-xs font-normal leading-4.5 tracking-[-0.24px]">
            로그인
          </span>

          <span className="text-content-base text-xl font-bold leading-7 tracking-[-0.4px] whitespace-nowrap">
            5초만에 시작하고 이 분과 대화해보세요!
          </span>

          <span className="text-additive text-base font-medium leading-7 tracking-[-0.48px]">
            지금과 간단하게 카카오톡으로 회원가입하고 <br /> 이 분과
            대화해보세요!
          </span>
        </div>

        <div className="px-4 py-2.5">
          <div
            className="w-full flex gap-2 justify-center items-center p-4 rounded-xl bg-[#FEE502] cursor-pointer"
            onClick={() =>
              (window.location.href = `${
                import.meta.env.VITE_BASE_URL
              }/oauth2/authorization/kakao`)
            }
          >
            <img src={Kakao} />
            로그인
          </div>
        </div>
      </div>
    </BlurBackground>
  );
};
