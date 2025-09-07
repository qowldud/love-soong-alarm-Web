import { useNavigate } from "react-router-dom";
import { CHAT_PROFILE_CONST } from "../../../hooks/consts";
import { CardHeader } from "../../Common";

type ListProps = {
  emoji: string;
  name: string;
  recent: string;
  time: string;
  isRecent: boolean;
  isChecked: boolean;
};

const List = ({ item }: { item: ListProps }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-row justify-between items-center px-4 py-2.5"
      onClick={() => navigate("/chat/1")}
    >
      <div className="flex flex-row justify-center items-center gap-x-3">
        <div>{item.emoji}</div>
        <div className="flex flex-col">
          <div className="text-[16px] text-[#231D33] ">{item.name}</div>
          <div className="flex flex-row gap-x-1 justify-center items-center text-[12px]">
            <div
              className={`${
                item.isRecent ? "text-main1 font-bold" : "text-[#231D33]/80"
              }`}
            >
              {item.recent}
            </div>
            <div className="text-[#231D33]/60 font-light">| {item.time}</div>
          </div>
        </div>
      </div>
      {item.isRecent ? (
        <div className="rounded-full w-1.5 h-1.5 bg-main1" />
      ) : item.isChecked ? (
        <div className="text-[#231D33]/60 font-light text-[12px]">읽음</div>
      ) : (
        <div className="text-[#231D33]/60 font-light text-[12px]">안읽음</div>
      )}
    </div>
  );
};

export const ChatPreview = () => {
  return (
    <div className="relative">
      <CardHeader branch="chat" title="채팅" />
      <div className="flex flex-col overflow-y-scroll">
        {CHAT_PROFILE_CONST.map((item, index) => (
          <List key={index} item={item} />
        ))}
      </div>
    </div>
  );
};
