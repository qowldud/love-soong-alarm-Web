import type React from "react";

import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export const Tutorial_Card = ({ children }: { children: React.ReactNode }) => (
  <AnimatePresence>
    <motion.div
      role="dialog"
      aria-modal
      className="absolute left-0 right-0 bottom-0 z-50"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 430, damping: 36 }}
    >
      <div
        className={clsx("mx-auto w-full rounded-t-2xl bg-white flex flex-col")}
      >
        <div className="flex items-center justify-center pt-2.5 pb-0.5 shrink-0">
          <div className="h-1.5 w-12 rounded-full bg-divider-regular" />
        </div>
        <div className="overflow-y-auto flex-1 min-h-0 px-4">{children}</div>
      </div>
    </motion.div>
  </AnimatePresence>
);
