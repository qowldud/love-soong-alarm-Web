import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ChatContent } from "../components/chat/Content";
import { useSwipeBack } from "../hooks/useSwipePage";
import type { Context } from "../components/chat/Layout";
import { CardLayout } from "../components/home/Card/Layout";
import { ExcessChat } from "../components/home/Card/ExcessChat";
import { IgnoreUser } from "../components/home/Card/IgnoreUser";
import { useMessageStore } from "../store/messageStore";

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
  const prevIdRef = useRef<number | null>(null);

  const newMessage = useMessageStore((state) => state.newMessage);

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

  const baseLen = chatDetail.recentMessages?.length ?? 0;
  const liveLen = newMessage.length;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [baseLen, liveLen, containerRef]);

  const allMessages = [...(chatDetail.recentMessages ?? []), ...newMessage];

  return (
    <>
      <div
        ref={containerRef}
        className="relative h-full w-full overflow-y-auto touch-pan-y"
      >
        {allMessages.map((item, index) => (
          <ChatContent key={item.messageId ?? index} item={item} />
        ))}
      </div>
      <RenderCard />
    </>
  );
};
