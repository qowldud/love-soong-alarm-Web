import { AnimatePresence, motion } from "framer-motion";

import type { ReactNode, ButtonHTMLAttributes } from "react";

import Alarm from "@/assets/icons/ic_alarm.svg";
import Setting from "@/assets/icons/ic_setting.svg";
import Location from "@/assets/icons/ic_location.svg";
import Chat from "@/assets/icons/ic_chat.svg";
import Map from "@/assets/icons/ic_mock_map.svg";

import { HomeBottom } from "../components/Home/Bottom";
import { ProfileCard } from "../components/Home/Profile";

import { useHomeStore } from "../store/homeStore";
import { ProfilePreview } from "../components/Home/Card/ProfilePreview";
import { AlramPreview } from "../components/Home/Card/Alram";
import { ChatPreview } from "../components/Home/Card/ChatPreview";
import { CardLayout } from "../components/Home/Card/Layout";

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

const RenderCard = () => (
  <>
    <CardLayout branch="profile">
      <ProfilePreview />
    </CardLayout>

    <CardLayout branch="alarm">
      <AlramPreview />
    </CardLayout>

    <CardLayout branch="chat">
      <ChatPreview />
    </CardLayout>
  </>
);

export const Home = () => {
  const setCheckProfile = useHomeStore((state) => state.setCheckProfile);
  const setCheckAlarm = useHomeStore((state) => state.setCheckAlarm);
  const setCheckChat = useHomeStore((state) => state.setCheckChat);

  return (
    <AnimatePresence>
      <motion.div
        key="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative w-full h-screen bg-gray-200 overflow-hidden"
      >
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
        <RenderCard />
      </motion.div>
    </AnimatePresence>
  );
};
