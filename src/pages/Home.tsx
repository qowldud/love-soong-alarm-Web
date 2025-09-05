// import { motion } from "framer-motion";

import type { ReactNode, ButtonHTMLAttributes } from "react";

import Alarm from "@/assets/icons/ic_alarm.svg";
import Setting from "@/assets/icons/ic_setting.svg";
import Location from "@/assets/icons/ic_location.svg";
import Chat from "@/assets/icons/ic_chat.svg";
import Map from "@/assets/icons/ic_mock_map.svg";

import { HomeBottom } from "../components/Home/Bottom";
import { ProfileCard } from "../components/Home/Profile";

import { CheckProfile } from "../components/Home/Card/CheckProfile";

import { useHomeStore } from "../store/homeStore";
import { ProfilePreview } from "../components/Home/ProfilePreview";
import { AlramPreview } from "../components/Home/Card/Alram";
import { ChatPreview } from "../components/Home/Card/ChatPreview";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

// TEST DATA
// const CORRECT_COUNT = 0;
const CORRECT_COUNT = 1;

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button className="p-4 bg-white rounded-[12px]" {...props}>
      {children}
    </button>
  );
};

export const Home = () => {
  const checkProfile = useHomeStore((state) => state.checkProfile);
  const checkAlarm = useHomeStore((state) => state.checkAlarm);
  const checkChat = useHomeStore((state) => state.checkChat);

  const setCheckProfile = useHomeStore((state) => state.setCheckProfile);
  const setCheckAlarm = useHomeStore((state) => state.setCheckAlarm);
  const setCheckChat = useHomeStore((state) => state.setCheckChat);

  return (
    <div className="relative w-full h-screen bg-gray-200 overflow-hidden">
      <img
        src={Map}
        alt="map background"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      <div className="absolute top-15.5 left-4 right-4 z-30">
        <ProfileCard />
      </div>

      <div className="absolute flex flex-row gap-x-2 left-4 right-4 top-57 z-30 justify-between">
        <Button>
          <img src={Setting} alt={"setting"} />
        </Button>
        <Button onClick={() => setCheckAlarm(true)}>
          <img src={Alarm} alt={"alarm"} />
        </Button>
      </div>

      <div className="absolute flex flex-row gap-x-2 left-4 right-4 bottom-10.5 z-30 items-center">
        <Button>
          <img src={Location} alt={"location"} />
        </Button>
        <HomeBottom
          count={CORRECT_COUNT}
          onClick={() => setCheckProfile(true)}
        />
        <Button onClick={() => setCheckChat(true)}>
          <img src={Chat} alt={"chat"} />
        </Button>
      </div>

      <CheckProfile
        isOpen={checkProfile}
        onClose={() => setCheckProfile(false)}
        maxHeightPct={72}
      >
        <ProfilePreview />
      </CheckProfile>

      <CheckProfile
        isOpen={checkAlarm}
        onClose={() => setCheckAlarm(false)}
        maxHeightPct={95.5}
      >
        <AlramPreview onClose={() => setCheckAlarm(false)} />
      </CheckProfile>

      <CheckProfile
        isOpen={checkChat}
        onClose={() => setCheckChat(false)}
        maxHeightPct={75.5}
      >
        <ChatPreview onClose={() => setCheckChat(false)} />
      </CheckProfile>
    </div>
  );
};
