import type { ReactNode, ButtonHTMLAttributes } from "react";
import { useEffect, useRef } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";

import Location from "@/assets/icons/ic_location.svg";
import Chat from "@/assets/icons/ic_chat.svg";
import Chat_Alarm from "@/assets/icons/ic_unread_chat.svg";

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
import { OutOfBoundsNotice } from "../OutOfBoundsNotice";
import { useChatStore } from "../../../store/chatStore";
import { ReachMaxModal } from "../../../hooks/modal";
import { useQuery } from "@tanstack/react-query";
import { useApi } from "../../../api/api";
import type { UserProfile } from "../../../types/User";
import { useSelectedUserStore } from "../../../store/useSelectedUserStore";
import { SelectRandom } from "../../../hooks/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

// const MOVE_THRESHOLD_METERS = 5;

// TEST DATA
// const CORRECT_COUNT = 0;

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button className="p-4 bg-white rounded-[12px]" {...props}>
      {children}
    </button>
  );
};

export const LoggedInView = ({
  handleSendSubscribeList,
  handleSendUnsubscribeList,
}: {
  handleSendSubscribeList: () => void;
  handleSendUnsubscribeList: () => void;
}) => {
  const revalidator = useRevalidator();

  const mapRef = useRef<{ moveToCurrentLocation: () => void }>(null);

  const { locationData } = useLoaderData();
  const { location } = useGeoLocation();

  const isAuth = useAuthStore((state) => state.isAuth);
  const reachMax = useChatStore((state) => state.reachMax);
  const isChatAlarm = useHomeStore((state) => state.isChatAlarm);

  const setIsModalOpen = useAuthStore((state) => state.setIsModalOpen);
  const setCheckProfile = useHomeStore((state) => state.setCheckProfile);
  const setCheckChat = useHomeStore((state) => state.setCheckChat);
  const setSelectedUserId = useSelectedUserStore(
    (state) => state.setSelectedUserId
  );

  const handleMoveToCurrentLocation = () => {
    mapRef.current?.moveToCurrentLocation();
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
        <ChatPreview
          handleSendSubscribeList={handleSendSubscribeList!}
          handleSendUnsubscribeList={handleSendUnsubscribeList!}
        />
      </CardLayout>
    </>
  );

  // // TODO: React-Query로 화면 전체 리랜더링 최소화 해야함
  // // 최신 좌표/마지막 전송 좌표 저장용 ref
  const latestRef = useRef<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (location?.latitude != null && location?.longitude != null) {
      latestRef.current = { lat: location.latitude, lng: location.longitude };
    }
  }, [location?.latitude, location?.longitude]);

  useEffect(() => {
    const onRevalidate = () => {
      revalidator.revalidate();
    };
    window.addEventListener("revalidate:home", onRevalidate);
    return () => window.removeEventListener("revalidate:home", onRevalidate);
  }, [revalidator]);

  useStepLocationUpdate({
    enabled: isAuth,
    intervalMs: 10000,
    thresholdMeters: 0,
    getCurrent: () => latestRef.current,
    post: ({ latitude, longitude }) => postLocation({ latitude, longitude }),
  });

  const { getData } = useApi();

  const { data: myProfile } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => getData<UserProfile>("/api/users/me"),
  });

  return (
    <div className="h-full relative">
      <div className="w-full h-full">
        {locationData ? (
          <MapCanvas
            users={locationData?.data?.nearbyUsersInformation}
            ref={mapRef}
            myProfile={myProfile?.data}
          />
        ) : (
          <OutOfBoundsNotice />
        )}
      </div>

      <div className="absolute top-0 left-0 right-0 z-40">
        <ProfileCard
          userCount={locationData?.data?.nearbyUsersInformation?.length ?? 0}
        />
      </div>

      {/* <div
        className={`${
          isAuth ? "top-57" : "top-62"
        } absolute flex flex-row gap-x-2 left-4 right-4 z-30 justify-between`}
      /> */}

      <div className="absolute flex flex-row gap-x-2 left-4 right-4 bottom-2 z-30 items-center">
        <Button onClick={handleMoveToCurrentLocation}>
          <img src={Location} alt={"location"} />
        </Button>

        <HomeBottom
          count={locationData?.data?.matchCount}
          onClick={() => {
            if (!isAuth) {
              setIsModalOpen({ flag: true, type: "edit" });
              return;
            }
            setSelectedUserId(
              SelectRandom(locationData.data.nearbyUsersInformation)
            );
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
          <img src={`${isChatAlarm ? Chat_Alarm : Chat}`} alt={"chat"} />
        </Button>
      </div>
      <RenderCard />

      {reachMax && <ReachMaxModal />}
    </div>
  );
};
