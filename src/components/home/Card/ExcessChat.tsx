import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../common/Button";

import Ticket from "@/assets/icons/ic_ticket.svg";
import { useApi } from "../../../api/api";
import { toast } from "react-toastify";
import { useChatStore } from "../../../store/chatStore";

export const ExcessChat = () => {
  const { postData } = useApi();

  const navigate = useNavigate();
  const { chatRoomId } = useParams<{ chatRoomId: string }>();
  const setExcessChat = useChatStore((state) => state.setExcessChat);

  const handleUse = async () => {
    const response = await postData(
      `/api/chats/rooms/${chatRoomId}/tickets`,
      {}
    );

    if (response.success) {
      setExcessChat(false);
      toast.success(response.message);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-col">
        <div className="flex flex-col gap-y-2 py-4">
          <div className="text-xs text-assistive font-light">
            사용자 발신 10개 제한
          </div>
          <div className="text-xl text-content-base font-bold">
            보낼 수 있는 대화를 초과했어요
          </div>
          <div className="text-base text-additive">
            "김숭실" 님과 계속 대화하고 싶다면, <br />
            채팅 연장 티켓을 구매하거나 사용해 대화를 이어가세요!
          </div>
        </div>

        <div className="flex flex-row py-2.5 justify-between">
          <div className="flex flex-row gap-x-2">
            <img src={Ticket} alt={"Ticket"} className="w-6 h-6" />
            <div className="text-base text-assistive font-light">
              내 채팅 티켓
            </div>
          </div>
          <div className="text-base text-additive">3개</div>
        </div>

        <div className="flex flex-row gap-x-2 py-2.5">
          <Button
            variant="secondary"
            children="사용하기"
            onClick={() => handleUse()}
          />
          <Button
            variant="primary"
            children="구매하기"
            onClick={() => navigate("/coin")}
          />
        </div>
      </div>
    </div>
  );
};
