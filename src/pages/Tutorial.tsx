import type React from "react";

import Logo from "@/assets/icons/Logo.svg?url";
import LoginIcon from "@/assets/icons/Login.svg?url";
import Up_Arrow from "@/assets/icons/ic_up_arrow.svg";
import Tutorial_Image from "@/assets/icons/ic_tutorial_marker.svg";
import { TutorialMap } from "../components/home/TutorialMap";

const ScreenOverlay = () => (
  <div className="fixed inset-0 bg-[#231D33]/50 pointer-events-none z-40" />
);

const StartInfo = () => (
  <div className="absolute top-15 right-4 flex flex-col gap-y-2 px-5 py-4 z-50 bg-fill-static rounded-xl items-end">
    <img src={Up_Arrow} alt={"Up_Arrow"} className="w-6 h-6" />
    <div className="text-base text-content-base font-normal">
      5초만에 빠르게 시작해보세요!
    </div>
  </div>
);

const ImgInfo = () => (
  <img
    src={Tutorial_Image}
    alt={"Tutorial_Image"}
    className="absolute top-50 right-8.5 z-50"
  />
);

export const Tutorial = ({
  setIsTutorial,
}: {
  setIsTutorial: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="w-full h-full relative">
      <ScreenOverlay />
      <StartInfo />
      <ImgInfo />

      <div className="h-full relative">
        <div className="absolute top-0 left-0 right-0 z-30 bg-white">
          <div className="w-full px-4 pt-4 pb-6 flex justify-between items-center h-15">
            <img src={Logo} alt={"Logo"} className="size-12" />
            <div className="flex flex-row gap-x-2">
              <img
                src={LoginIcon}
                alt="login_icon"
                className="cursor-pointer"
              />

              <div className="text-base font-normal text-content-base">
                시작하기
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-full">
          <TutorialMap />
        </div>
      </div>
    </div>
  );
};
