import { Outlet, useLocation } from "react-router-dom";

import { Header } from "../common/Header";

export const PrivateLayout = () => {
  const { pathname } = useLocation();

  const HEADER_TEXT = pathname.includes("coin")
    ? "충전"
    : pathname.includes("alarm")
    ? "알림"
    : pathname.includes("setting")
    ? "설정"
    : pathname.includes("chat")
    ? "채팅"
    : "";

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <div className="flex flex-col items-center gap-4 shrink-0">
        <Header title={`${HEADER_TEXT}`} />
      </div>

      <Outlet />
    </div>
  );
};
