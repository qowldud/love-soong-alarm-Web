import { motion } from "framer-motion";

import { Button } from "../../common/Button";
import { Title } from "../../common/Title";

import { AUTH_CONST } from "../../hooks/consts";
import { Input } from "../../common/Input";
import { useNavigate } from "react-router-dom";

export const AuthInput = () => {
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
        <Title title={AUTH_CONST.input.title} sub={AUTH_CONST.input.label} />
        <Input placeholder={`${AUTH_CONST.input.placeholder}`} />
      </div>
      <Button
        variant="primary"
        children="인증번호 받기"
        onClick={() => navigate("/auth/valid")}
      />
    </motion.div>
  );
};
