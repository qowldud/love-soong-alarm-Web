import Send from "@/assets/icons/ic_send.svg";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export const ChatInput = ({
  handleSend,
}: {
  handleSend: (chatRoomId: number, content: string) => void;
}) => {
  const [message, setMessage] = useState<string>("");
  const { chatRoomId } = useParams<{ chatRoomId: string }>();
  const inputRef = useRef<HTMLInputElement>(null);
  const isTouchMoveActive = useRef(false);

  const handleMessage = () => {
    if (!message.trim()) {
      return;
    }
    handleSend(Number(chatRoomId), message);
    setMessage("");

    inputRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    const onTouchMove = () => {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    };

    const handleFocus = () => {
      if (isTouchMoveActive.current) return;
      isTouchMoveActive.current = true;
      document.addEventListener("touchmove", onTouchMove, { passive: true });
    };

    const handleBlur = () => {
      isTouchMoveActive.current = false;
      document.removeEventListener("touchmove", onTouchMove);
    };

    const input = inputRef.current;
    if (input) {
      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);
    }

    return () => {
      if (input) {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      }
      document.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <div
      id="chat-input-wrapper"
      className="flex w-full py-3 px-4 border-t-[#9A92AD]/16 border-t-[1px]"
    >
      <div className="flex w-full py-2 bg-[#9A92AD]/8 rounded-[12px]">
        <div className="flex flex-row w-full px-4 py-2 gap-x-2">
          <input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleMessage();
              }
            }}
            className="w-full border-none outline-none focus:ring-0 text-[16px] text-[#231D33]/60"
            placeholder="메시지를 입력하세요"
          />
          <img
            src={Send}
            alt={"send"}
            className="w-6 h-6 cursor-pointer"
            onClick={handleMessage}
          />
        </div>
      </div>
    </div>
  );
};
