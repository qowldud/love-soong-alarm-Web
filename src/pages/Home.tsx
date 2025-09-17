import type { ReactNode, ButtonHTMLAttributes } from "react";
// import { useEffect, useRef } from "react";

import Location from "@/assets/icons/ic_location.svg";
import Chat from "@/assets/icons/ic_chat.svg";

import { HomeBottom } from "../components/home/Bottom";
import { ProfileCard } from "../components/home/Profile";

import { useHomeStore } from "../store/homeStore";
import { ProfilePreview } from "../components/home/Card/ProfilePreview";
import { ChatPreview } from "../components/home/Card/ChatPreview";
import { CardLayout } from "../components/home/Card/Layout";
import { useAuthStore } from "../store/authStore";
import { MapCanvas } from "../components/home/Map";
import { LoginCard } from "../components/home/Card/LoginCard";
// import { useLoaderData } from "react-router-dom";
// import { useGeoLocation } from "../hooks/useGeoLocation";
// import { postLocation } from "../api/location";

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

    <CardLayout branch="chat">
      <ChatPreview />
    </CardLayout>
  </>
);

export const Home = () => {
  // const { locationData, chatLists } = useLoaderData();
  // const { location, error } = useGeoLocation();

  const isAuth = useAuthStore((state) => state.isAuth);

  const setIsModalOpen = useAuthStore((state) => state.setIsModalOpen);
  const setCheckProfile = useHomeStore((state) => state.setCheckProfile);
  const setCheckChat = useHomeStore((state) => state.setCheckChat);

  // TODO: React-Query로 화면 전체 리랜더링 최소화 해야함
  // 최신 좌표/마지막 전송 좌표 저장용 ref
  // const latestLocRef = useRef<{ lat: number; lng: number } | null>(null);
  // const lastSentRef = useRef<{ lat: number; lng: number } | null>(null);

  // // 좌표 갱신될 때마다 최신값을 ref에 반영
  // useEffect(() => {
  //   if (location?.latitude != null && location?.longitude != null) {
  //     latestLocRef.current = {
  //       lat: location.latitude,
  //       lng: location.longitude,
  //     };
  //   }
  // }, [location?.latitude, location?.longitude]);

  // // 🔁 3초마다 서버로 위치 전송
  // useEffect(() => {
  //   if (!isAuth) return; // 비로그인 시 전송 안 함

  //   let timer: number | null = null;

  //   const tick = async () => {
  //     const cur = latestLocRef.current;
  //     if (!cur) return;

  //     // 같은 좌표 반복 전송 방지 (원하면 주석 처리)
  //     const last = lastSentRef.current;
  //     if (last && last.lat === cur.lat && last.lng === cur.lng) return;

  //     try {
  //       await postLocation({ latitude: cur.lat, longitude: cur.lng });
  //       lastSentRef.current = cur;
  //     } catch (e) {
  //       // 조용히 실패 처리 (네트워크 일시 오류 등)
  //       console.warn("postLocation failed:", e);
  //     }
  //   };

  //   // 즉시 한 번 보내고, 이후 3초 간격
  //   void tick();
  //   timer = window.setInterval(tick, 3000);

  //   return () => {
  //     if (timer) window.clearInterval(timer);
  //   };
  // }, [isAuth]); // isAuth 바뀔 때만 타이머 재설정

  // console.log(locationData, chatLists, location, error);

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
