import { Button_v2 } from "../../common/Button";

import { Hashtag_v2, ProfileLabel } from "../Common";
import { useChatStore } from "../../store/chatStore";
import type { ChatDetail } from "../../types/chat";

export const ChatCard = ({ chatDetail }: { chatDetail: ChatDetail }) => {
  const setIgnoreUser = useChatStore((state) => state.setIgnoreUser);

  return (
    <div className="relative flex flex-col gap-y-1 bg-white px-4 py-2.5 w-full">
      <div className="flex flex-row justify-between items-center py-2.5">
        <ProfileLabel chatDetail={chatDetail} />
        {chatDetail?.isPartnerBlocked ? (
          <Button_v2 branch="UNBLOCK" onClick={() => setIgnoreUser(true)} />
        ) : (
          <Button_v2 branch="BLOCK" onClick={() => setIgnoreUser(true)} />
        )}
      </div>

      <div className="flex flex-row flex-nowrap gap-x-1.5 overflow-x-auto py-2 pr-4 no-scrollbar">
        {chatDetail.partner.interests.map((item, index) => (
          <Hashtag_v2 key={index} item={item} />
        ))}
      </div>

      <div className="absolute top-30 left-0 w-full h-1 pointer-events-none bg-gradient-to-b to-transparent from-gray-200/60" />
    </div>
  );
};
