import Up_Arrow from "@/assets/icons/ic_up_arrow.svg";
import Logo from "@/assets/icons/Logo.svg?url";
import LoginIcon from "@/assets/icons/Login.svg?url";
import { Dummy_Marker } from "./Dummy_Marker";

const FinalHint = () => (
  <div className="absolute top-15 right-4 flex flex-col gap-y-2 px-5 py-4 z-30 bg-fill-static rounded-xl items-end shadow-xl">
    <img src={Up_Arrow} alt="Up" className="w-6 h-6" />
    <div className="text-base text-content-base">
      지금 바로 5초만에 빠르게 시작해보세요!
    </div>
  </div>
);

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

const NavigateButton = ({
  setIsTutorial,
}: {
  setIsTutorial: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className="absolute top-3 right-4 bg-white flex flex-row gap-x-2 items-center z-50 p-2 rounded-xl cursor-pointer"
      onClick={() => setIsTutorial(false)}
    >
      <img src={LoginIcon} alt="login_icon" className="cursor-pointer" />
      <div className="text-base font-normal text-content-base">시작하기</div>
    </div>
  );
};

export const Tutorial_4 = ({
  setIsTutorial,
}: {
  setIsTutorial: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <div className="w-full h-full relative">
    <Overlay />
    <FinalHint />
    <DisplayMarker />
    <NavigateButton setIsTutorial={setIsTutorial} />

    <div className="absolute top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur">
      <div className="w-full px-4 pt-4 pb-6 flex justify-between items-center h-15">
        <img src={Logo} alt="Logo" className="size-12" />
      </div>
    </div>
  </div>
);
