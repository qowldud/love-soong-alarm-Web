import type { RecentMessage } from "../../types/chat";

export const ChatContent = ({ item }: { item: RecentMessage }) => {
  return (
    <div
      className={`flex w-full px-4 py-2 ${
        item.isSentByMe ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex px-5 py-2.5 rounded-[50px] ${
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
