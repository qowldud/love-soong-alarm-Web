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
import { useEffect, useRef, useState } from "react";
import { Header } from "../../common/Header";

export interface Context extends SocketActions {
  chatDetail: ChatDetail;
}

export const ChatLayout = () => {
  const revalidator = useRevalidator();
  const { chatDetail } = useLoaderData();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLDivElement | null>(null);

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(
    window.visualViewport?.height || window.innerHeight
  );

  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || !window.visualViewport) return;

    const handleResize = () => {
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      const inputHeight = inputRef.current?.offsetHeight ?? 0;

      const vpHeight = window.visualViewport?.height ?? window.innerHeight;
      setKeyboardVisible(vpHeight < viewportHeight);
      setViewportHeight(vpHeight);

      const usableHeight = vpHeight - headerHeight - inputHeight;
      setContentHeight(usableHeight);
    };

    window.visualViewport.addEventListener("resize", handleResize);
    window.visualViewport.addEventListener("scroll", handleResize);
    handleResize();

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
        window.visualViewport.removeEventListener("scroll", handleResize);
      }
    };
  }, []);

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
    // <div className={`flex h-full max-w-dvw flex-col overflow-hidden `}>
    //   <div className="flex flex-col items-center gap-4 shrink-0">
    //     <ChatCard chatDetail={chatDetail?.data} />
    //   </div>
    //   <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
    //     <Outlet context={ctx} />
    //   </div>
    //   <div className="shrink-0 safe-bottom">
    //     <ChatInput handleSend={handleSend!} />
    //   </div>
    // </div>

    <div
      ref={wrapRef}
      className={`absolute bottom-0 flex w-full max-w-dvw flex-col overflow-hidden`}
      style={{ height: viewportHeight }}
    >
      <div className="flex flex-col" ref={headerRef}>
        <Header title="채팅" />
        {!keyboardVisible && <ChatCard chatDetail={chatDetail?.data} />}
      </div>

      <div
        className="flex-1 min-h-0 overflow-hidden"
        style={{ height: contentHeight }}
      >
        <Outlet context={ctx} />
      </div>
      <div className="shrink-0 safe-bottom z-10" ref={inputRef}>
        <ChatInput handleSend={handleSend!} />
      </div>
    </div>
  );
};
