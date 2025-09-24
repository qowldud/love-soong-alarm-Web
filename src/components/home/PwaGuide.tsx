import { BlurBackground } from "../../common/BlurBackground";
import Ios_pwa from "@/assets/icons/ios_pwa.svg";
import And_pwa from "@/assets/icons/and_pwa.svg";

interface Props {
  onClose: () => void;
}

export const PwaGuide = ({ onClose }: Props) => {
  return (
    <BlurBackground onClick={onClose}>
      <div className="flex flex-col bg-white w-full rounded-2xl p-5">
        <div className="flex flex-col mb-2">
          <span className="text-content-base text-base sm:text-lg md:text-xl font-bold leading-7 tracking-[-0.4px]">
            나에게 온 채팅, 푸시알림으로 놓지지 마세요
          </span>
          <span className="text-additive text-sm sm:text-base md:text-md font-medium leading-7 tracking-[-0.48px]">
            3초만에 설정하고 신규 채팅 알림 받기
          </span>
        </div>

        <div className="flex flex-col text-additive text-xs font-normal leading-4.5 tracking-[-0.26px] px-1 mb-2">
          <span>사용하시는 브라우저에서</span>
          <span className="text-[#090909]">
            {`옵션 > 홈 화면에 추가(현재 페이지 추가)`}{" "}
          </span>
          <span>설정 후 홈화면에 설치된 웹앱에서 숭리는을 즐겨보세요!</span>
        </div>

        <div className="w-full flex justify-center">
          <div className="flex gap-5">
            <div className="flex flex-col gap-3 items-center">
              <span className="text-black text-xs font-normal leading-7 tracking-[-0.22px]">
                iOS
              </span>

              <img src={Ios_pwa} alt="ios_pwa" loading="eager" />
            </div>

            <div className="flex flex-col gap-3 items-center">
              <span className="text-black text-xs font-normal leading-7 tracking-[-0.22px]">
                Android
              </span>

              <img src={And_pwa} alt="ios_pwa" loading="eager" />
            </div>
          </div>
        </div>
      </div>
    </BlurBackground>
  );
};
