import Logo from "@/assets/icons/Logo.svg?url";
import LoginIcon from "@/assets/icons/Login.svg?url";
import { LogoutMap } from "../LogoutMap";
import { CardLayout } from "../Card/Layout";
import { LoginCard } from "../Card/LoginCard";
import { ProfilePreview } from "../Card/ProfilePreview";
import { ChatPreview } from "../Card/ChatPreview";

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

export const LoggedOutView = () => {
  return (
    <>
      <div className="w-full h-full flex flex-col z-10">
        <div className="w-full px-4 pt-4 pb-6 flex justify-between items-center h-15">
          <img src={Logo} alt={"Logo"} className="size-12" />
          <img src={LoginIcon} alt="login_icon" />
        </div>

        <LogoutMap />

        <RenderCard />
      </div>
    </>
  );
};
