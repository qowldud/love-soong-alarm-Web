import { useOutletContext } from "react-router-dom";
import { LoggedInView } from "../components/home/view/LoggedInView";
import { LoggedOutView } from "../components/home/view/LoggedOutView";
import type { SocketActions } from "../components/Layout/SocketLayout";
import { useAuthStore } from "../store/authStore";

export const Home = () => {
  const accessToken = localStorage.getItem("accessToken");
  const { isAuth } = useAuthStore();
  const { handleSendSubscribeList, handleSendUnsubscribeList } =
    useOutletContext<SocketActions>();

  return isAuth && accessToken ? (
    <LoggedInView
      handleSendSubscribeList={handleSendSubscribeList!}
      handleSendUnsubscribeList={handleSendUnsubscribeList!}
    />
  ) : (
    <LoggedOutView />
  );
};
