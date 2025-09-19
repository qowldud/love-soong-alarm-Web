import type { ReactNode, ButtonHTMLAttributes } from "react";
import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";

import Location from "@/assets/icons/ic_location.svg";
import Chat from "@/assets/icons/ic_chat.svg";

import { HomeBottom } from "../Bottom";
import { ProfileCard } from "../Profile";

import { useHomeStore } from "../../../store/homeStore";
import { ProfilePreview } from "../Card/ProfilePreview";
import { ChatPreview } from "../Card/ChatPreview";
import { CardLayout } from "../Card/Layout";
import { useAuthStore } from "../../../store/authStore";
import { MapCanvas } from "../Map";
import { LoginCard } from "../Card/LoginCard";

import { useGeoLocation } from "../../../hooks/useGeoLocation";
import { postLocation } from "../../../api/location";
import { useStepLocationUpdate } from "../../../hooks/useLocationUpdate";
import { useChatStore } from "../../../store/chatStore";
import { ReachMaxModal } from "../../../hooks/modal";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

// const MOVE_THRESHOLD_METERS = 5;

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

export const LoggedInView = () => {
  // const revalidator = useRevalidator();

  const { locationData, chatLists } = useLoaderData();
  const { location } = useGeoLocation();
  console.log(locationData);

  const RenderCard = () => (
    <>
      <CardLayout branch="login">
        <LoginCard />
      </CardLayout>

      <CardLayout branch="profile">
        <ProfilePreview />
      </CardLayout>

      <CardLayout branch="chat">
        <ChatPreview items={chatLists.data} />
      </CardLayout>
    </>
  );

  const isAuth = useAuthStore((state) => state.isAuth);
  const reachMax = useChatStore((state) => state.reachMax);

  const setIsModalOpen = useAuthStore((state) => state.setIsModalOpen);
  const setCheckProfile = useHomeStore((state) => state.setCheckProfile);
  const setCheckChat = useHomeStore((state) => state.setCheckChat);

  // // TODO: React-Query로 화면 전체 리랜더링 최소화 해야함
  // // 최신 좌표/마지막 전송 좌표 저장용 ref
  const latestRef = useRef<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (location?.latitude != null && location?.longitude != null) {
      latestRef.current = { lat: location.latitude, lng: location.longitude };
    }
  }, [location?.latitude, location?.longitude]);

  useStepLocationUpdate({
    enabled: isAuth,
    intervalMs: 3000,
    thresholdMeters: 10,
    getCurrent: () => latestRef.current,
    post: ({ latitude, longitude }) => postLocation({ latitude, longitude }),
  });

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

      {reachMax && <ReachMaxModal />}
    </>
  );
};
