import Logo from "@/assets/icons/Logo.svg?url";
import LoginIcon from "@/assets/icons/Login.svg?url";
import Up_Arrow from "@/assets/icons/ic_up_arrow.svg";
import Tutorial_Image from "@/assets/icons/ic_tutorial_marker.svg";

import { LogoutMap } from "../LogoutMap";
import { CardLayout } from "../Card/Layout";
import { LoginCard } from "../Card/LoginCard";
import { ProfilePreview } from "../Card/ProfilePreview";
import { useState } from "react";
import { LoginModal } from "../LoginModal";
import { TutorialMap } from "../TutorialMap";
import { Tutorial } from "../../../pages/Tutorial";
// import { ChatPreview } from "../Card/ChatPreview";

const RenderCard = () => (
  <>
    <CardLayout branch="login">
      <LoginCard />
    </CardLayout>

    <CardLayout branch="profile" className="absolute bottom-0">
      <ProfilePreview />
    </CardLayout>

    {/* <CardLayout branch="chat">
      <ChatPreview />
    </CardLayout> */}
  </>
);

export const LoggedOutView = () => {
  const [isTutorial, setIsTutorial] = useState(true);
  const [isLogin, setLogin] = useState(false);

  if (!isTutorial) {
    return <Tutorial setIsTutorial={setIsTutorial} />;
  }

  return (
    <div className="h-full relative">
      {isLogin && (
        <LoginModal type="button" handleClose={() => setLogin(false)} />
      )}
      <div className="absolute top-0 left-0 right-0 z-40 bg-white">
        <div className="w-full px-4 pt-4 pb-6 flex justify-between items-center h-15">
          <img src={Logo} alt={"Logo"} className="size-12" />
          <div className="flex flex-row gap-x-2">
            <img
              src={LoginIcon}
              alt="login_icon"
              className="cursor-pointer"
              onClick={() => setLogin(true)}
            />
            <div className="text-base font-normal text-content-base">
              시작하기
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full">
        <LogoutMap />
      </div>
      <RenderCard />
    </div>
  );
};
