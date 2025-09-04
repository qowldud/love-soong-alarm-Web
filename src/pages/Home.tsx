// import { motion } from "framer-motion";

import { type ReactNode } from "react";

import Alarm from "@/assets/icons/ic_alarm.svg";
import Setting from "@/assets/icons/ic_setting.svg";
import Location from "@/assets/icons/ic_location.svg";
import Chat from "@/assets/icons/ic_chat.svg";
import Map from "@/assets/icons/ic_mock_map.svg";

import { HomeBottom } from "../components/Home/Bottom";
import { ProfileCard } from "../components/Home/Profile";

// TEST DATA
// const CORRECT_COUNT = 0;
const CORRECT_COUNT = 1;

const Button = ({ children }: { children: ReactNode }) => {
  return <div className="p-4 bg-white rounded-[12px]">{children}</div>;
};

export const Home = () => {
  return (
    <div className="relative w-[444px] max-w-[444px] h-screen bg-gray-200 overflow-hidden ">
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
        <Button>
          <img src={Alarm} alt={"alarm"} />
        </Button>
      </div>

      <div className="absolute flex flex-row gap-x-2 left-4 right-4 bottom-10.5 z-30 items-center">
        <Button>
          <img src={Location} alt={"location"} />
        </Button>
        <HomeBottom count={CORRECT_COUNT} />
        <Button>
          <img src={Chat} alt={"chat"} />
        </Button>
      </div>
    </div>
  );
};
