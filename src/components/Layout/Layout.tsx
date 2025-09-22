import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import mixpanel from "mixpanel-browser";

export const Layout = () => {
  mixpanel.init(`${import.meta.env.VITE_MIX_PANEL}`, {
    debug: true,
    track_pageview: true,
    persistence: "localStorage",
    record_sessions_percent: 1,
    record_heatmap_data: true,
  });

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
          className="custom-toast-container"
        />
      </motion.div>
    </AnimatePresence>
  );
};
