import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export const Layout = () => {
  return (
    <AnimatePresence>
      <motion.div
        key="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative w-full h-full overflow-hidden"
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
};
