import type { RecentMessage } from "../../types/chat";

import Sent from "@/assets/icons/ic_sent.svg";
import Check from "@/assets/icons/ic_check.svg";

export const ChatContent = ({ item }: { item: RecentMessage }) => {
  return (
    <div
      className={`flex flex-row gap-x-2 w-full px-4 py-2 items-end ${
        item.isSentByMe ? "justify-end" : "justify-start"
      }`}
    >
      {item.isSentByMe ? (
        item.isRead ? (
          <img src={Check} alt={"Check"} className="w-4 h-4" />
        ) : (
          <img src={Sent} alt={"Sent"} className="w-4 h-4" />
        )
      ) : (
        <></>
      )}

      <div
        className={`px-5 py-2.5 rounded-2xl whitespace-pre-wrap break-all w-fit max-w-[85%] ${
          item.isSentByMe
            ? "bg-[#9A92AD]/12 text-[#231D33]"
            : "bg-main1 text-white"
        }`}
      >
        {item.content}
      </div>
    </div>
  );
};
