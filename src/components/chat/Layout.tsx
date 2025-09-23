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

  useEffect(() => {
    // 뷰포트 높이를 설정하는 함수
    const setViewportHeight = () => {
      // 뷰포트의 실제 높이를 가져옴
      const viewportHeight = window.innerHeight;
      // CSS 변수로 설정
      document.documentElement.style.setProperty("--vh", `${viewportHeight}px`);
    };

    // 처음 렌더링 시 높이 설정
    setViewportHeight();

    // 창 크기 변경 및 리사이즈 이벤트에 따라 높이 재설정
    window.addEventListener("resize", setViewportHeight);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", setViewportHeight);
    };
  }, []);

  return (
    <div
      className="flex max-w-dvw flex-col overflow-hidden"
      style={{ height: "var(--vh)" }}
    >
      <div className="flex flex-col items-center gap-4 shrink-0">
        <ChatCard chatDetail={chatDetail?.data} />
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
