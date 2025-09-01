import { motion } from "framer-motion";

import { Button } from "../../common/Button";

export const AuthInput = () => {
  return (
    <motion.div
      key="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="h-full w-full flex flex-col items-center justify-between px-4 pb-11"
    >
      <div></div>
      <Button variant="primary" children="시작하기" />
    </motion.div>
  );
};
