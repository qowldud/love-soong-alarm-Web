import {
  Outlet,
  useLoaderData,
  useOutletContext,
  useRevalidator,
} from "react-router-dom";

import { ChatCard } from "./Card";
import { ChatInput } from "./Input";
import type { SocketActions } from "../Layout/SocketLayout";
import type { ChatDetail } from "../../types/chat";
import { useEffect } from "react";

export interface Context extends SocketActions {
  chatDetail: ChatDetail;
}

export const ChatLayout = () => {
  const revalidator = useRevalidator();
  const { chatDetail } = useLoaderData();

  const { handleEnter, handleExit, handleSend, handleBlock, handleUnblock } =
    useOutletContext<SocketActions>();

  const ctx: Context = {
    handleEnter,
    handleExit,
    handleSend,
    chatDetail: chatDetail.data,
  };

  useEffect(() => {
    const onRevalidate = () => {
      revalidator.revalidate();
    };
    window.addEventListener("revalidate:chat", onRevalidate);
    return () => window.removeEventListener("revalidate:chat", onRevalidate);
  }, [revalidator]);

  return (
    <div className="flex h-dvh max-w-dvw flex-col overflow-hidden">
      <div className="flex flex-col items-center gap-4 shrink-0">
        <ChatCard
          chatDetail={chatDetail?.data}
          handleBlock={handleBlock!}
          handleUnblock={handleUnblock!}
        />
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
