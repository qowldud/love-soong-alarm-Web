import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Logo from "@/assets/icons/ic_lovin.svg";

const Splash = () => (
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
);

export const Entry = () => {
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsSplash(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isSplash ? (
        <Splash />
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="h-full w-full flex items-center justify-center"
        >
          hello
        </motion.div>
      )}
    </AnimatePresence>
  );
};
