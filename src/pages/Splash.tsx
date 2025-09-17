import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Logo from "@/assets/icons/ic_lovin.svg";

import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useHomeStore } from "../store/homeStore";

export const Splash = () => {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);
  const setIsModalOpen = useAuthStore((state) => state.setIsModalOpen);
  const setReset = useHomeStore((state) => state.setReset);

  // TODO: 핸들 함수 구현
  const handleLogin = () => {
    login("tmp");

    setIsModalOpen({ flag: false });
    setReset();

    navigate("/");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleLogin();
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="splash"
        className="absolute inset-0 z-[9999] flex items-center justify-center bg-main1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.img
          src={Logo}
          alt="logo"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </AnimatePresence>
  );
};
