import { useOutletContext } from "react-router-dom";
import { LoggedInView } from "../components/home/view/LoggedInView";
import { LoggedOutView } from "../components/home/view/LoggedOutView";
import type { SocketActions } from "../components/Layout/SocketLayout";

export const Home = () => {
  const isAuth = localStorage.getItem("accessToken");
  const { handleSendSubscribeList, handleSendUnsubscribeList } =
    useOutletContext<SocketActions>();

  return isAuth ? (
    <LoggedInView
      handleSendSubscribeList={handleSendSubscribeList!}
      handleSendUnsubscribeList={handleSendUnsubscribeList!}
    />
  ) : (
    <LoggedOutView />
  );
};
