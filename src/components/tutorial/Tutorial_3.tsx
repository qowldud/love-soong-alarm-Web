import Up_Arrow from "@/assets/icons/ic_tutorial_button.svg";
import Logo from "@/assets/icons/Logo.svg?url";

import Location from "@/assets/icons/ic_location.svg";
import Chat_Alarm from "@/assets/icons/ic_unread_chat.svg";

import Coin from "@/assets/icons/ic_coin.svg";
import Alarm_Notice from "@/assets/icons/ic_unread_notice.svg";
import Setting from "@/assets/icons/ic_setting.svg";
import View from "@/assets/icons/ic_view.svg";
import Reload from "@/assets/icons/ic_reload.svg";
import { Dummy_Button, Dummy_Home } from "./Dummy_Home";
import { Dummy_Marker } from "./Dummy_Marker";

const DisplayMarker = () => (
  <>
    <div className="absolute z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-[140px]">
      <div className="flex flex-row gap-x-10 justify-between w-full">
        <div className="">
          <Dummy_Marker
            emoji="🎧"
            active="level1"
            isMatching={false}
            isSelected={true}
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

    <div className="absolute z-0 left-1/2 top-1/2 -translate-x-1/2 translate-y-[140px]">
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
  <div className="absolute inset-0 bg-[#231D33]/50 pointer-events-none z-10" />
);

const CenterGuide = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute inset-0 z-40 pointer-events-none">
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/90 px-5 py-4 min-w-max text-center shadow-lg pointer-events-auto">
      {children}
    </div>
  </div>
);

export const Tutorial_3 = () => (
  <div className="w-full h-full relative">
    <Overlay />
    <DisplayMarker />

    <div className="absolute top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur">
      <div className="flex flex-col bg-white">
        <div className="flex flex-row items-center justify-between py-3.5 px-4">
          <img src={Logo} alt={"Logo"} className="w-8 h-8" />
          <div className="flex flex-row gap-x-4">
            <img src={Coin} alt={"Coin"} className="w-6 h-6 cursor-pointer" />
            <img
              src={Alarm_Notice}
              alt={"Alarm"}
              className="w-6 h-6 cursor-pointer"
            />
            <img
              src={Setting}
              alt={"Setting"}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-row items-center justify-between py-2.5 px-4">
          <div className="flex flex-row items-center gap-x-1">
            <img src={View} alt={"View"} className="w-4 h-4" />
            <div className="text-[14px] font-light text-assistive">
              6 명의 사용자가 표시되고 있어요
            </div>
          </div>
          <div className="flex flex-row items-center gap-x-1 cursor-pointer">
            <img src={Reload} alt={"Reload"} className="w-5 h-5" />
            <div className="text-[14px] font-normal text-additive underline">
              새로고침
            </div>
          </div>
        </div>
      </div>
    </div>

    <CenterGuide>
      <div className="flex flex-col w-full gap-y-2 items-center">
        <img src={Up_Arrow} alt={"up"} className="w-5 h-5" />
        <div className="text-base font-bold text-main1">
          나와 취향이 일치하는 사용자를 탐지할 수 있어요
        </div>
      </div>
    </CenterGuide>

    <div className="absolute flex flex-row gap-x-2 left-4 right-4 bottom-2 z-30 items-center safe-bottom">
      <Dummy_Button>
        <img src={Location} alt={"location"} className="w-6 h-6" />
      </Dummy_Button>

      <Dummy_Home />

      <Dummy_Button>
        <img src={Chat_Alarm} alt={"chat"} className="w-6 h-6" />
      </Dummy_Button>
    </div>
  </div>
);
