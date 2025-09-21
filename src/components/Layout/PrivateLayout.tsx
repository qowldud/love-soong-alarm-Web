import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { Header } from "../../common/Header";
import type { SocketActions } from "./SocketLayout";
import { useEffect } from "react";

export const PrivateLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!isAuth) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("auth-store");
      localStorage.removeItem("chat-store");
      sessionStorage.removeItem("home-store");
      navigate("/");
    }
  }, [isAuth]);

  const { handleEnter, handleExit, handleSend } =
    useOutletContext<SocketActions>();

  const ctx: SocketActions = { handleEnter, handleExit, handleSend };

  const HEADER_TEXT =
    pathname === "/coin"
      ? "충전"
      : pathname === "/alarm"
      ? "알림"
      : pathname === "/setting"
      ? "설정"
      : pathname.startsWith("/chat")
      ? "채팅"
      : "";

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <div className="flex flex-col items-center gap-4 shrink-0">
        {HEADER_TEXT && <Header title={HEADER_TEXT} />}
      </div>
      <Outlet context={ctx} />
    </div>
  );
};
