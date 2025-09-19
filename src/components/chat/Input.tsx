import Add from "@/assets/icons/ic_add.svg";
import Send from "@/assets/icons/ic_send.svg";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const ChatInput = ({
  handleSend,
}: {
  handleSend: (chatRoomId: number, content: string) => void;
}) => {
  const [message, setMessage] = useState<string>("");
  const { chatRoomId } = useParams<{ chatRoomId: string }>();

  const handleMessage = async () => {
    handleSend(Number(chatRoomId), message);
  };

  return (
    <div className="flex w-full py-3 px-4 border-t-[#9A92AD]/16 border-t-[1px]">
      <div className="flex w-full py-2 bg-[#9A92AD]/8 rounded-[12px]">
        <div className="flex flex-row w-full px-4 py-2 gap-x-2">
          <img src={Add} alt={"add"} className="w-6 h-6 p-1" />
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border-none outline-none focus:ring-0 text-[16px] text-[#231D33]/60"
            placeholder="메시지를 입력하세요"
          />
          <img
            src={Send}
            alt={"send"}
            className="w-6 h-6"
            onClick={() => handleMessage()}
          />
        </div>
      </div>
    </div>
  );
};
