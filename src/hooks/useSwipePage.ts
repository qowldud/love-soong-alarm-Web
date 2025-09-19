import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

type Opts = {
  threshold?: number;
  verticalGuard?: number;
  edgeOnly?: boolean;
  edgeWidth?: number;
  wheelThreshold?: number;
  ignoreEditable?: boolean;
  chatRoomId?: string;
  onExit?: (chatRoomId: number) => void;
};

export function useSwipeBack<T extends HTMLElement>(opts: Opts = {}) {
  const {
    threshold = 100,
    verticalGuard = 40,
    edgeOnly = true,
    edgeWidth = 32,
    wheelThreshold = 60,
    ignoreEditable = true,
    onExit,
    chatRoomId,
  } = opts;

  const nav = useNavigate();
  const ref = useRef<T | null>(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const touching = useRef(false);

  useEffect(() => {
    const el = ref.current ?? document.body;

    const isEditable = (t: EventTarget | null) => {
      if (!ignoreEditable) return false;
      if (!(t instanceof Element)) return false;
      const tag = t.tagName.toLowerCase();
      const editable =
        t.getAttribute("contenteditable") === "true" ||
        tag === "input" ||
        tag === "textarea" ||
        t.closest("input,textarea,[contenteditable='true']");
      return !!editable;
    };

    const callExit = () => {
      const idNum = Number(chatRoomId);
      if (onExit && Number.isFinite(idNum)) onExit(idNum);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (isEditable(e.target)) return;
      const t = e.touches[0];
      if (edgeOnly && t.clientX > edgeWidth) return;
      touching.current = true;
      startX.current = t.clientX;
      startY.current = t.clientY;
    };

    const onTouchMove = () => {
      if (!touching.current) return;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!touching.current) return;
      touching.current = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX.current;
      const dy = Math.abs(t.clientY - startY.current);
      if (dx > threshold && dy < verticalGuard) {
        // 나가기 먼저 -> 페이지 이동
        callExit();
        nav(-1);
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (isEditable(e.target)) return;
      if (Math.abs(e.deltaY) < 20 && e.deltaX > wheelThreshold) {
        callExit();
        nav(-1);
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart as any);
      el.removeEventListener("touchmove", onTouchMove as any);
      el.removeEventListener("touchend", onTouchEnd as any);
      el.removeEventListener("wheel", onWheel as any);
    };
  }, [
    edgeOnly,
    edgeWidth,
    threshold,
    verticalGuard,
    wheelThreshold,
    ignoreEditable,
    onExit,
    chatRoomId,
    nav,
  ]);

  return ref;
}
