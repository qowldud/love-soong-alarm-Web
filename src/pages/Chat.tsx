import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import { ChatContent } from "../components/chat/Content";
import { useSwipeBack } from "../hooks/useSwipePage";
import type { Context } from "../components/chat/Layout";
import { CardLayout } from "../components/home/Card/Layout";
import { ExcessChat } from "../components/home/Card/ExcessChat";
import { IgnoreUser } from "../components/home/Card/IgnoreUser";
import { getPrevChat } from "../api/chat";
import type { RecentMessage } from "../types/chat";

const RenderCard = () => (
  <>
    <CardLayout branch="excesschat">
      <ExcessChat />
    </CardLayout>
    <CardLayout branch="ignoreuser">
      <IgnoreUser />
    </CardLayout>
  </>
);

export const Chat = () => {
  const { handleEnter, handleExit, chatDetail } = useOutletContext<Context>();
  const { chatRoomId } = useParams<{ chatRoomId: string }>();
  const id = Number(chatRoomId);

  const [messages, setMessages] = useState<RecentMessage[]>([]);
  const [oldestId, setOldestId] = useState<number | null>(
    chatDetail?.oldestMessageId ?? null
  );
  const [hasPrev, setHasPrev] = useState<boolean>(
    Boolean(chatDetail?.hasMoreMessages)
  );
  const [loadingPrev, setLoadingPrev] = useState(false);

  const prevIdRef = useRef<number | null>(null);

  useEffect(() => {
    const prevId = prevIdRef.current;
    if (Number.isFinite(id)) {
      if (prevId !== null && prevId !== id && Number.isFinite(prevId)) {
        handleExit?.(prevId);
      }
      if (prevId !== id) handleEnter?.(id);
      prevIdRef.current = id;
    }
    return () => {
      const lastId = prevIdRef.current;
      if (Number.isFinite(lastId!)) handleExit?.(lastId!);
      prevIdRef.current = null;
    };
  }, [id, handleEnter, handleExit]);

  const containerRef = useSwipeBack<HTMLDivElement>({
    threshold: 100,
    verticalGuard: 40,
    edgeOnly: true,
    wheelThreshold: 80,
    chatRoomId: chatRoomId!,
    onExit: handleExit,
  });
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const { ref: topRef, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
  }, [chatDetail?.recentMessages]);

  const handleLoadPrev = async () => {
    if (!hasPrev || loadingPrev || oldestId == null) return;

    setLoadingPrev(true);
    const el = containerRef.current;
    const before = el?.scrollHeight ?? 0;

    try {
      const res = await getPrevChat({
        roomId: id,
        lastMessageId: oldestId,
        size: 50,
      });

      const page = res?.data;
      const newList = page?.messages ?? [];

      setMessages((prev) => [...newList.slice().reverse(), ...prev]);
      setOldestId(page?.oldestMessageId ?? null);
      setHasPrev(Boolean(page?.hasMoreMessages));

      const el2 = containerRef.current;

      if (el2) {
        const after = el2.scrollHeight;
        el2.scrollTop += after - before;
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPrev(false);
    }
  };

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => {
        handleLoadPrev();
      }, 60);
      return () => clearTimeout(t);
    }
  }, [inView]);

  return (
    <>
      <div
        ref={containerRef}
        className="relative h-full max-w-dvw overflow-y-auto touch-pan-y"
      >
        <div ref={topRef} />

        {messages?.map((item) => (
          <ChatContent key={item.messageId} item={item} />
        ))}

        {chatDetail.recentMessages?.map((item) => (
          <ChatContent key={item.messageId} item={item} />
        ))}

        {loadingPrev && (
          <div className="py-2 text-center text-xs text-gray-500">
            이전 메시지 불러오는 중…
          </div>
        )}

        <div ref={bottomRef} />
      </div>
      <RenderCard />
    </>
  );
};
