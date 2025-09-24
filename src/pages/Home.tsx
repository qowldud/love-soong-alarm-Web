import { useNavigate, useOutletContext } from "react-router-dom";
import { LoggedInView } from "../components/home/view/LoggedInView";
import type { SocketActions } from "../components/Layout/SocketLayout";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import { PwaGuide } from "../components/home/PwaGuide";

const isStandalone = () => {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes("android-app://")
  );
};

export const Home = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const { isAuth } = useAuthStore();
  const { handleSendSubscribeList, handleSendUnsubscribeList } =
    useOutletContext<SocketActions>();
  const [showInstallPopup, setShowInstallPopup] = useState(false);

  useEffect(() => {
    if (!isAuth || !accessToken) {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/login");
    }
  }, [accessToken, isAuth]);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("pwaPopup");
    if (!isStandalone() && !alreadyShown) {
      setShowInstallPopup(true);
      sessionStorage.setItem("pwaPopup", "true");
    }
  }, []);

  return isAuth && accessToken ? (
    <>
      {showInstallPopup && (
        <PwaGuide onClose={() => setShowInstallPopup(false)} />
      )}
      <LoggedInView
        handleSendSubscribeList={handleSendSubscribeList!}
        handleSendUnsubscribeList={handleSendUnsubscribeList!}
      />
    </>
  ) : (
    <></>
  );
};
