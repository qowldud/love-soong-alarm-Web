import Logo from "@/assets/icons/Logo.svg?url";
import LoginIcon from "@/assets/icons/Login.svg?url";
import Up_Arrow from "@/assets/icons/ic_tutorial_button.svg";

import { Dummy_Marker } from "./Dummy_Marker";

const DisplayMarker = () => (
  <>
    <div className="absolute z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-[140px]">
      <div className="flex flex-row gap-x-10 justify-between w-full">
        <div className="">
          <Dummy_Marker
            emoji="🎧"
            active="level1"
            isMatching={false}
            isSelected={false}
          />
        </div>
        <div className="mb-15">
          <Dummy_Marker
            emoji="🤪"
            active="level1"
            isMatching={false}
            isSelected={false}
          />
        </div>
        <div className="mt-5 ml-5">
          <Dummy_Marker
            emoji="👍"
            active="level2"
            isMatching={false}
            isSelected={false}
          />
        </div>
      </div>
    </div>

    <div className="absolute z-50 left-1/2 top-1/2 -translate-x-1/2 translate-y-[140px]">
      <div className="flex flex-row gap-x-10 justify-between w-full">
        <div className="mr-10">
          <Dummy_Marker
            emoji="🥰"
            active="level2"
            isMatching={false}
            isSelected={false}
          />
        </div>
        <div className="mb-20">
          <Dummy_Marker
            emoji="🤣"
            active="level2"
            isMatching={false}
            isSelected={false}
          />
        </div>
        <div className="mt-15">
          <Dummy_Marker
            emoji="💞"
            active="level1"
            isMatching={false}
            isSelected={false}
          />
        </div>
      </div>
    </div>
  </>
);

const Overlay = () => (
  <div className="absolute inset-0 bg-[#231D33]/50 pointer-events-none z-30" />
);

const CenterGuide = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute inset-0 z-40 pointer-events-none">
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/90 px-5 py-4 min-w-max text-center shadow-lg pointer-events-auto">
      {children}
    </div>
  </div>
);

export const Tutorial_1 = () => (
  <div className="w-full h-full relative z-20">
    <Overlay />
    <DisplayMarker />

    <div className="absolute top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur">
      <div className="w-full px-4 pt-4 pb-6 flex justify-between items-center h-15">
        <img src={Logo} alt="Logo" className="size-12" />
        <div className="flex flex-row gap-x-2 items-center">
          <img src={LoginIcon} alt="login_icon" className="cursor-pointer" />
          <div className="text-base font-normal text-content-base">
            시작하기
          </div>
        </div>
      </div>
    </div>

    <CenterGuide>
      <div className="flex flex-col w-full gap-y-2 items-center">
        <img src={Up_Arrow} alt={"up"} className="w-5 h-5" />
        <div className="text-base font-bold text-main1">
          마커를 터치해서 다른 사용자를 확인해보세요
        </div>
      </div>
    </CenterGuide>
  </div>
);
