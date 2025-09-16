import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHomeStore } from "../../../store/homeStore";
import { useAuthStore } from "../../../store/authStore";

type BottomSheetProps = {
  branch: "profile" | "alarm" | "chat" | "login" | "logout" | "memberout";
  children: React.ReactNode;
};

const BRANCH_CONST = {
  profile: {
    maxHeightPct: 72,
  },
  alarm: {
    maxHeightPct: 95.5,
  },
  chat: {
    maxHeightPct: 75.5,
  },
  login: {
    maxHeightPct: 72,
  },
  logout: {
    maxHeightPct: 72,
  },
  memberout: {
    maxHeightPct: 72,
  },
};

export const CardLayout = ({ branch, children }: BottomSheetProps) => {
  const maxHeightPct = BRANCH_CONST[branch].maxHeightPct;

  const login = useAuthStore((state) => state.isModalOpen);
  const profile = useHomeStore((state) => state.checkProfile);
  const chat = useHomeStore((state) => state.checkChat);
  const logout = useAuthStore((state) => state.isLogoutOpen);
  const memberout = useAuthStore((state) => state.isMemberOutOpen);

  const setLogin = useAuthStore((state) => state.setModalOpen);
  const setCheckProfile = useHomeStore((state) => state.setCheckProfile);
  const setCheckChat = useHomeStore((state) => state.setCheckChat);
  const setLogout = useAuthStore((state) => state.setIsLogoutOpen);
  const setMemberout = useAuthStore((state) => state.setIsMemberOutOpen);

  const isOpen =
    branch === "login"
      ? login
      : branch === "profile"
      ? profile
      : branch === "chat"
      ? chat
      : branch === "logout"
      ? logout
      : memberout;

  const onClose =
    branch === "login"
      ? setLogin
      : branch === "profile"
      ? setCheckProfile
      : branch === "chat"
      ? setCheckChat
      : branch === "logout"
      ? setLogout
      : setMemberout;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose;
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="absolute inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onClose(false)}
          />
          <motion.div
            role="dialog"
            aria-modal
            className="absolute left-0 right-0 bottom-0 z-50"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 430, damping: 36 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 800) onClose(false);
            }}
          >
            <div
              className="mx-auto w-full rounded-t-2xl bg-white "
              style={{ maxHeight: `calc(${maxHeightPct}vh)` }}
            >
              <div className="flex items-center justify-center py-2">
                <div className="h-1.5 w-12 rounded-full bg-gray-300" />
              </div>
              <div className="overflow-y-auto px-4 pb-6">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
