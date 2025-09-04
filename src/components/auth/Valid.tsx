import { motion } from "framer-motion";

import { Button } from "../../common/Button";
import { Title } from "../../common/Title";

import { AUTH_CONST } from "../../hooks/consts";
import { Input } from "../../common/Input";
import { useNavigate } from "react-router-dom";

export const AuthValid = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      key="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="h-full w-full flex flex-col items-center justify-between px-5 py-4 pb-11"
    >
      <div className="w-full flex flex-col items-center gap-y-6">
        <Title title={AUTH_CONST.valid.title} sub={AUTH_CONST.valid.label} />
        <Input placeholder={`${AUTH_CONST.valid.placeholder}`} />
      </div>
      <Button
        variant="primary"
        children="인증하기"
        onClick={() => navigate("/home")}
      />
    </motion.div>
  );
};
