import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHomeStore } from "../../../store/homeStore";
import { useAuthStore } from "../../../store/authStore";
import { useChatStore } from "../../../store/chatStore";
import { useSelectedUserStore } from "../../../store/useSelectedUserStore";

type BottomSheetProps = {
  branch:
    | "profile"
    | "alarm"
    | "chat"
    | "login"
    | "logout"
    | "memberout"
    | "excesschat"
    | "ignoreuser";
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
    maxHeightPct: 40,
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
  excesschat: {
    maxHeightPct: 72,
  },
  ignoreuser: {
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
  const excesschat = useChatStore((state) => state.excessChat);
  const ignoreuser = useChatStore((state) => state.ignoreUser);

  const setLogin = useAuthStore((state) => state.setModalOpen);
  const setCheckProfile = useHomeStore((state) => state.setCheckProfile);
  const setCheckChat = useHomeStore((state) => state.setCheckChat);
  const setLogout = useAuthStore((state) => state.setIsLogoutOpen);
  const setMemberout = useAuthStore((state) => state.setIsMemberOutOpen);
  const setExcessChat = useChatStore((state) => state.setExcessChat);
  const setIgnoreUser = useChatStore((state) => state.setIgnoreUser);
  const { resetSelected } = useSelectedUserStore();

  const cardRef = useRef<HTMLDivElement>(null);

  const isOpen =
    branch === "login"
      ? login
      : branch === "profile"
      ? profile
      : branch === "chat"
      ? chat
      : branch === "logout"
      ? logout
      : branch === "memberout"
      ? memberout
      : branch === "excesschat"
      ? excesschat
      : ignoreuser;

  const onClose =
    branch === "login"
      ? setLogin
      : branch === "profile"
      ? setCheckProfile
      : branch === "chat"
      ? setCheckChat
      : branch === "logout"
      ? setLogout
      : branch === "memberout"
      ? setMemberout
      : branch === "excesschat"
      ? setExcessChat
      : setIgnoreUser;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose;
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        if (branch === "profile") resetSelected();
        onClose(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            ref={cardRef}
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
              if (info.offset.y > 120 || info.velocity.y > 800) {
                if (branch === "profile") resetSelected();
                onClose(false);
              }
            }}
          >
            <div
              className="mx-auto w-full rounded-t-2xl bg-white flex flex-col"
              style={{ maxHeight: `calc(${maxHeightPct}vh)` }}
            >
              <div className="flex items-center justify-center pt-2.5 pb-0.5 shrink-0">
                <div className="h-1.5 w-12 rounded-full bg-divider-regular" />
              </div>
              <div className="overflow-y-auto flex-1 min-h-0 px-4">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
