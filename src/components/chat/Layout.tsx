import { Outlet } from "react-router-dom";

import { Header } from "../../common/Header";
import { ChatCard } from "./Card";
import { ChatInput } from "./Input";

export const ChatLayout = () => {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <div className="flex flex-col items-center gap-4 shrink-0">
        <Header title="채팅" />
        <ChatCard />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
        <Outlet />
      </div>

      <div className="shrink-0">
        <ChatInput />
      </div>
    </div>
  );
};
