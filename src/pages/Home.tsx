import type { ReactNode, ButtonHTMLAttributes } from "react";

import Location from "@/assets/icons/ic_location.svg";
import Chat from "@/assets/icons/ic_chat.svg";

import { HomeBottom } from "../components/home/Bottom";
import { ProfileCard } from "../components/home/Profile";

import { useHomeStore } from "../store/homeStore";
import { ProfilePreview } from "../components/home/Card/ProfilePreview";
import { AlramPreview } from "../components/home/Card/Alram";
import { ChatPreview } from "../components/home/Card/ChatPreview";
import { CardLayout } from "../components/home/Card/Layout";
import { useAuthStore } from "../store/authStore";
import { MapCanvas } from "../components/home/Map";
import { LoginCard } from "../components/home/Card/LoginCard";

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
    <CardLayout branch="login">
      <LoginCard />
    </CardLayout>

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
  const isAuth = useAuthStore((state) => state.isAuth);

  const setIsModalOpen = useAuthStore((state) => state.setIsModalOpen);
  const setCheckProfile = useHomeStore((state) => state.setCheckProfile);
  const setCheckChat = useHomeStore((state) => state.setCheckChat);

  return (
    <>
      <MapCanvas />
      <div
        className={`${
          isAuth ? "w-full" : "top-5 left-4 right-4"
        } absolute z-30`}
      >
        <ProfileCard />
      </div>

      <div
        className={`${
          isAuth ? "top-57" : "top-62"
        } absolute flex flex-row gap-x-2 left-4 right-4 z-30 justify-between`}
      />

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

        <Button
          onClick={() => {
            if (!isAuth) {
              setIsModalOpen({ flag: true, type: "edit" });
              return;
            }
            setCheckChat(true);
          }}
        >
          <img src={Chat} alt={"chat"} />
        </Button>
      </div>
      <RenderCard />
    </>
  );
};
