import { useNavigate } from "react-router-dom";
import { CardHeader } from "../../Common";
import type { ChatRoom } from "../../../types/chat";

import Lock from "@/assets/icons/ic_lock.svg";
import Right_Button from "@/assets/icons/ic_right_button.svg";
import { useHomeStore } from "../../../store/homeStore";
import { useEffect, useState } from "react";
import { useMessageStore } from "../../../store/messageStore";
import { getChatLists } from "../../../api/chat";
import { formatRelativeKo } from "../../../hooks/utils";

const List = ({ item }: { item: ChatRoom }) => {
  const navigate = useNavigate();

  const tsRaw = item?.lastMessageInfo?.timestamp;
  console.log(tsRaw);
  const tsText = tsRaw ? formatRelativeKo(tsRaw) : "";

  return (
    <div
      className="flex flex-row justify-between items-center px-4 py-2.5 w-full"
      onClick={() => navigate(`/chat/${item.chatRoomId}`)}
    >
      <div className="flex flex-row items-center gap-x-3 min-w-0 w-full">
        <div className="flex justify-center items-center w-6 h-6">
          {item.emoji}
        </div>

        <div className="flex flex-col min-w-0 w-[80%]">
          <div className="text-[16px] text-[#231D33] truncate">
            {item.partnerNickname}
          </div>

          <div className="flex flex-row items-center gap-x-1 text-[12px] min-w-0">
            <div
              className={`flex min-w-0 ${
                !item.lastMessageInfo.isSentByMe && !item.lastMessageInfo.isRead
                  ? "text-main1 font-bold"
                  : "text-[#231D33]/80"
              }`}
              title={
                item.lastMessageInfo.content + (tsText ? ` | ${tsText}` : "")
              }
            >
              <div className="flex-1 min-w-0 truncate">
                {item.lastMessageInfo.content}
              </div>

              {tsText && (
                <div className="shrink-0 ml-1 text-[#231D33]/60 font-light ">
                  | {tsText}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {!item.lastMessageInfo.isSentByMe && !item.lastMessageInfo.isRead ? (
        <div className="rounded-full w-1.5 h-1.5 bg-main1 ml-1.5" />
      ) : item.lastMessageInfo.isRead ? (
        <div className="text-[#231D33]/60 font-light text-[12px] ml-1.5 whitespace-nowrap">
          읽음
        </div>
      ) : (
        <div className="text-[#231D33]/60 font-light text-[12px] ml-1.5 whitespace-nowrap">
          안읽음
        </div>
      )}
    </div>
  );
};

const EmptyList = () => {
  const setCheckChat = useHomeStore((state) => state.setCheckChat);

  return (
    <div
      className="flex flex-row justify-between items-center w-full px-4 py-2.5"
      onClick={() => setCheckChat(false)}
    >
      <div className="flex flex-row justify-center items-center gap-x-3">
        <img src={Lock} alt={"Lock"} className="w-6 h-6" />
        <div className="flex flex-col justify-start w-full">
          <div className="text-content-base text-base">빈 슬롯</div>
          <div className="text-additive text-xs font-normal">
            내 취향의 이성을 매치해서 대화해보세요!
          </div>
        </div>
      </div>
      <img
        src={Right_Button}
        alt={"Right_Button"}
        className="flex justify-end w-4 h-4 cursor-pointer"
      />
    </div>
  );
};

const LockedList = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-row justify-between items-center w-full px-4 py-2.5"
      onClick={() => navigate("/coin")}
    >
      <div className="flex flex-row justify-center items-center gap-x-3">
        <img src={Lock} alt={"Lock"} className="w-6 h-6" />
        <div className="flex flex-col justify-start w-full">
          <div className="text-content-base text-base">잠겨있는 슬롯이에요</div>
          <div className="text-additive text-xs font-normal">
            잠금 해제하고 더 많은 이성과 대화하러 가기
          </div>
        </div>
      </div>
      <img
        src={Right_Button}
        alt={"Right_Button"}
        className="flex justify-end w-4 h-4"
      />
    </div>
  );
};

export const ChatPreview = ({
  handleSendSubscribeList,
  handleSendUnsubscribeList,
}: {
  handleSendSubscribeList: () => void;
  handleSendUnsubscribeList: () => void;
}) => {
  const [remainSlot, setRemainSlot] = useState<number>();
  const newChats = useMessageStore((state) => state.newChats);
  const setInitLists = useMessageStore((s) => s.setInitLists);

  useEffect(() => {
    (async () => {
      try {
        const res = await getChatLists();
        if (res?.data?.chatRooms) {
          setRemainSlot(res.data.userSlotInfo.remainingSlot ?? 0);
          setInitLists({ chatRooms: res.data.chatRooms });
        }
      } catch (err) {
        console.error("채팅 리스트 불러오기 실패:", err);
      }
    })();

    handleSendSubscribeList();
    return () => {
      handleSendUnsubscribeList();
    };
  }, [handleSendSubscribeList, handleSendUnsubscribeList, setInitLists]);

  return (
    <div className="relative pb-10">
      <CardHeader branch="chat" title="채팅" />
      <div className="flex flex-col overflow-auto">
        {newChats?.map((item) => (
          <List key={item.chatRoomId} item={item} />
        ))}

        {Array.from({ length: remainSlot ?? 0 }).map((_, idx) => (
          <EmptyList key={idx} />
        ))}

        <LockedList />
      </div>
    </div>
  );
};
