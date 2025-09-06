import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Logo from "@/assets/icons/ic_lovin.svg";
import Color_Logo from "@/assets/icons/ic_color_lovin.svg";

import { Button } from "../common/Button";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setIsSplash(false), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isSplash ? (
        <Splash />
      ) : (
        <div className="h-full w-full flex flex-col items-center justify-between px-4 pb-11">
          <div className="flex flex-col gap-y-4 justify-center items-center h-full ">
            <img src={Color_Logo} alt="로고" className="w-20 h-20" />
            <div className="flex flex-col gap-y-2">
              <div className="flex flex-col font-[500] justify-center items-center text-[40px]">
                <div>
                  <span className="text-main1">5,197명</span> 중
                </div>
                <div>
                  <span className="font-[700]">당신의 운명</span>은
                </div>
                <div>누구일까요?</div>
              </div>
              <div className="flex flex-col font-[400] justify-center items-center text-[#331D24CC]">
                <div>좋아하면 숭리는에서</div>
                <div>당신과 딱 맞는 운명을 찾아보세요!</div>
              </div>
            </div>
          </div>
          <Button
            variant="primary"
            children="시작하기"
            onClick={() => navigate("/auth/input")}
          />
        </div>
      )}
    </AnimatePresence>
  );
};
