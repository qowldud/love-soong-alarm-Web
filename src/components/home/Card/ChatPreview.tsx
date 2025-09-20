import { useNavigate } from "react-router-dom";
import { CardHeader } from "../../Common";
import type { ChatRoom } from "../../../types/chat";

import Lock from "@/assets/icons/ic_lock.svg";
import Right_Button from "@/assets/icons/ic_right_button.svg";
import { useHomeStore } from "../../../store/homeStore";
import { useEffect, useRef } from "react";
import { useMessageStore } from "../../../store/messageStore";

const List = ({ item }: { item: ChatRoom }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-row justify-between items-center px-4 py-2.5"
      onClick={() => navigate(`/chat/${item.chatRoomId}`)}
    >
      <div className="flex flex-row justify-center items-center gap-x-3">
        <div className="flex justify-center items-center w-6 h-6">
          {item.emoji}
        </div>
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
        <div className="rounded-full w-1.5 h-1.5 bg-main1 mr-1.5" />
      ) : item.lastMessageInfo.isRead ? (
        <div className="text-[#231D33]/60 font-light text-[12px] mr-1.5">
          읽음
        </div>
      ) : (
        <div className="text-[#231D33]/60 font-light text-[12px] mr-1.5">
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
  const newChats = useMessageStore((state) => state.newChats);

  const subscribeRef = useRef(handleSendSubscribeList);
  const unsubscribeRef = useRef(handleSendUnsubscribeList);
  const didSubscribeRef = useRef(false);

  subscribeRef.current = handleSendSubscribeList;
  unsubscribeRef.current = handleSendUnsubscribeList;

  useEffect(() => {
    const hasRooms = (newChats?.length ?? 0) > 0;
    if (!didSubscribeRef.current && hasRooms) {
      didSubscribeRef.current = true;
      subscribeRef.current();
    }

    return () => {
      if (didSubscribeRef.current) {
        didSubscribeRef.current = false;
        unsubscribeRef.current();
      }
    };
  }, []);

  return (
    <div className="relative pb-10">
      <CardHeader branch="chat" title="채팅" />
      <div className="flex flex-col overflow-auto">
        {newChats?.map((item, index) => (
          <List key={index} item={item} />
        ))}
        <EmptyList />
        <LockedList />
      </div>
    </div>
  );
};
