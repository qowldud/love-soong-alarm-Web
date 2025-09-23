import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import mixpanel from "mixpanel-browser";
import { useEffect } from "react";
// import { useAuthStore } from "../../store/authStore";

export const Layout = () => {
  useEffect(() => {
    // MixPanel 초기화
    mixpanel.init(`${import.meta.env.VITE_MIX_PANEL}`, {
      debug: true,
      track_pageview: true,
      persistence: "localStorage",
      record_sessions_percent: 1,
      record_heatmap_data: true,
    });

    const urlParams = new URLSearchParams(window.location.search);
    const referrer = document.referrer;

    // 슈퍼 프로퍼티 등록
    mixpanel.register({
      utm_source: urlParams.get("utm_source") || "direct",
      utm_medium: urlParams.get("utm_medium") || "none",
      utm_campaign: urlParams.get("utm_campaign") || "",
      utm_content: urlParams.get("utm_content") || "",
      utm_term: urlParams.get("utm_term") || "",
      referrer: referrer || "",
    });

    // 첫 방문 시 Landing 이벤트 트래킹(선택)
    mixpanel.track("Landing", {
      first_time_user: true,
    });
  }, []);

  // const { login } = useAuthStore();

  // useEffect(() => {
  //   localStorage.setItem(
  //     "accessToken",
  //     `eyJKV1QiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjo1LCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1ODYyMjk2OCwiZXhwIjoxNzU4NzA5MzY4fQ.Cj03_ZOY1p291j8L5Gjp7HEky72NNMhdh4If9-txXFA`
  //   );
  //   login(
  //     `eyJKV1QiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjo1LCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1ODYyMjk2OCwiZXhwIjoxNzU4NzA5MzY4fQ.Cj03_ZOY1p291j8L5Gjp7HEky72NNMhdh4If9-txXFA`
  //   );
  // }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative w-full h-full"
      >
        <Outlet />

        <ToastContainer
          position="top-center"
          autoClose={2500}
          closeOnClick
          hideProgressBar
          pauseOnHover
          draggable={false}
          closeButton={false}
          toastClassName="custom-toast-box"
          className="custom-toast-container mt-6"
        />
      </motion.div>
    </AnimatePresence>
  );
};
