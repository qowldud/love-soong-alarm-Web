import { useNavigate } from "react-router-dom";
import { CardHeader } from "../../Common";
import type { ChatRooms, ChatRoom } from "../../../types/chat";

const List = ({ item }: { item: ChatRoom }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-row justify-between items-center px-4 py-2.5"
      onClick={() => navigate(`/chat/${item.chatRoomId}`)}
    >
      <div className="flex flex-row justify-center items-center gap-x-3">
        <div>{item.emoji}</div>
        <div className="flex flex-col">
          <div className="text-[16px] text-[#231D33] ">
            {item.partnerNickname}
          </div>
          <div className="flex flex-row gap-x-1 justify-center items-center text-[12px]">
            <div
              className={`${
                !item.lastMessageInfo.isSentByMe && !item.lastMessageInfo.isRead
                  ? "text-main1 font-bold"
                  : "text-[#231D33]/80"
              }`}
            >
              {item.lastMessageInfo.content}
            </div>
            <div className="text-[#231D33]/60 font-light">
              | {item.lastMessageInfo.timestamp}
            </div>
          </div>
        </div>
      </div>
      {!item.lastMessageInfo.isSentByMe && !item.lastMessageInfo.isRead ? (
        <div className="rounded-full w-1.5 h-1.5 bg-main1" />
      ) : item.lastMessageInfo.isRead ? (
        <div className="text-[#231D33]/60 font-light text-[12px]">읽음</div>
      ) : (
        <div className="text-[#231D33]/60 font-light text-[12px]">안읽음</div>
      )}
    </div>
  );
};

export const ChatPreview = ({ items }: { items?: ChatRooms }) => {
  return (
    <div className="relative">
      <CardHeader branch="chat" title="채팅" />
      <div className="flex flex-col overflow-auto">
        {items?.chatRooms?.map((item, index) => (
          <List key={index} item={item} />
        ))}
      </div>
    </div>
  );
};
