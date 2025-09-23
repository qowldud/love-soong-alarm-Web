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
import { useLockAppHeight } from "../../hooks/useAppHeight";

export interface Context extends SocketActions {
  chatDetail: ChatDetail;
}

export const ChatLayout = () => {
  useLockAppHeight();

  const revalidator = useRevalidator();
  const { chatDetail } = useLoaderData() as { chatDetail: any };

  const { handleEnter, handleExit, handleSend, handleBlock, handleUnblock } =
    useOutletContext<SocketActions>();

  const ctx: Context = {
    handleEnter,
    handleExit,
    handleSend,
    handleBlock,
    handleUnblock,
    chatDetail: chatDetail.data,
  };

  useEffect(() => {
    const onRevalidate = () => {
      revalidator.revalidate();
    };
    window.addEventListener("revalidate:chat", onRevalidate);
    return () => {
      window.removeEventListener("revalidate:chat", onRevalidate);
    };
  }, [revalidator]);

  return (
    <div className="flex h-dvh max-w-dvw flex-col overflow-hidden touch-manipulation">
      <div className="flex flex-col items-center gap-4 shrink-0">
        <ChatCard chatDetail={chatDetail?.data} />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
        <Outlet context={ctx} />
      </div>

      <div className="shrink-0 sticky bottom-0 left-0 right-0">
        <ChatInput handleSend={handleSend!} />
      </div>
    </div>
  );
};
