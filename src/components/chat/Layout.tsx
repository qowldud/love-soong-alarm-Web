import { Outlet, useLoaderData, useOutletContext } from "react-router-dom";

import { ChatCard } from "./Card";
import { ChatInput } from "./Input";
import type { SocketActions } from "../Layout/SocketLayout";
import type { ChatDetail } from "../../types/chat";

export interface Context extends SocketActions {
  chatDetail: ChatDetail;
}

export const ChatLayout = () => {
  const { chatDetail } = useLoaderData();

  const { handleEnter, handleExit, handleSend } =
    useOutletContext<SocketActions>();

  const ctx: Context = {
    handleEnter,
    handleExit,
    handleSend,
    chatDetail: chatDetail.data,
  };

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <div className="flex flex-col items-center gap-4 shrink-0">
        <ChatCard chatDetail={chatDetail.data} />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
        <Outlet context={ctx} />
      </div>

      <div className="shrink-0">
        <ChatInput handleSend={handleSend!} />
      </div>
    </div>
  );
};
