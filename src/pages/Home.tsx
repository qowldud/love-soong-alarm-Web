import type { ReactNode, ButtonHTMLAttributes } from "react";

import Alarm from "@/assets/icons/ic_alarm.svg";
import Coin from "@/assets/icons/ic_coin.svg";
import Location from "@/assets/icons/ic_location.svg";
import Chat from "@/assets/icons/ic_chat.svg";
import Map from "@/assets/icons/ic_mock_map.svg";

import { HomeBottom } from "../components/home/Bottom";
import { ProfileCard } from "../components/home/Profile";

import { useHomeStore } from "../store/homeStore";
import { ProfilePreview } from "../components/home/Card/ProfilePreview";
import { AlramPreview } from "../components/home/Card/Alram";
import { ChatPreview } from "../components/home/Card/ChatPreview";
import { CardLayout } from "../components/home/Card/Layout";
import { LoginModal } from "../hooks/modal";
import { useAuthStore } from "../store/authStore";

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
  const loginType = useAuthStore((state) => state.loginType);
  const isAuth = useAuthStore((state) => state.isAuth);
  const isModalOpen = useAuthStore((state) => state.isModalOpen);
  const setIsModalOpen = useAuthStore((state) => state.setIsModalOpen);

  const setCheckProfile = useHomeStore((state) => state.setCheckProfile);
  const setCheckAlarm = useHomeStore((state) => state.setCheckAlarm);
  const setCheckChat = useHomeStore((state) => state.setCheckChat);

  return (
    <div>
      <img
        src={Map}
        alt="map background"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      <div className="absolute top-15.5 left-4 right-4 z-30">
        <ProfileCard />
      </div>

      <div
        className={`absolute flex flex-row gap-x-2 left-4 right-4 ${
          isAuth ? "top-57" : "top-62"
        } z-30 justify-between`}
      >
        <Button>
          <img src={Coin} alt={"coin"} />
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
          onClick={() => {
            if (!isAuth) {
              setIsModalOpen({ flag: true, type: "edit" });
              return;
            }
            setCheckProfile(true);
          }}
        />

        <Button onClick={() => setCheckChat(true)}>
          <img src={Chat} alt={"chat"} />
        </Button>
      </div>
      <RenderCard />

      {isModalOpen && <LoginModal type={loginType} />}
    </div>
  );
};
