import { useNavigate, useOutletContext } from "react-router-dom";
import { LoggedInView } from "../components/home/view/LoggedInView";
import type { SocketActions } from "../components/Layout/SocketLayout";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

export const Home = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const { isAuth } = useAuthStore();
  const { handleSendSubscribeList, handleSendUnsubscribeList } =
    useOutletContext<SocketActions>();

  useEffect(() => {
    if (!isAuth || !accessToken) {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/login");
    }
  }, [accessToken, isAuth]);

  return isAuth && accessToken ? (
    <LoggedInView
      handleSendSubscribeList={handleSendSubscribeList!}
      handleSendUnsubscribeList={handleSendUnsubscribeList!}
    />
  ) : (
    <></>
  );
};
