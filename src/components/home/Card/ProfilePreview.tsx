import { useNavigate } from "react-router-dom";
import { Button } from "../../../common/Button";
import { CardHeader, HashTagWrapper, Profile } from "../../Common";
import { useAuthStore } from "../../../store/authStore";
import { useSelectedUserStore } from "../../../store/useSelectedUserStore";

import { useApi } from "../../../api/api";
import type { MakeChat } from "../../../types/chat";
import { toast } from "react-toastify";
import { useChatStore } from "../../../store/chatStore";

export const ProfilePreview = () => {
  const navigate = useNavigate();
  const { postData } = useApi();
  const { selectedUser } = useSelectedUserStore();

  const isAuth = useAuthStore((state) => state.isAuth);
  const setIsModalOpen = useAuthStore((state) => state.setIsModalOpen);
  const setReachMax = useChatStore((state) => state.setReachMax);

  const handleClick = async (userId: number) => {
    if (!isAuth) {
      setIsModalOpen({ flag: true, type: "chat" });
      return;
    }

    const response = await postData<MakeChat>("/api/chats", {
      targetUserId: userId,
    });

    if (response.message === "사용 가능한 채팅 슬롯이 존재하지 않습니다.") {
      setReachMax(true);
      return;
    }

    if (response.success) {
      navigate(`/chat/${response.data.chatRoomId}`);
    } else toast.warn(response.message);
  };

  return (
    <div className="relative">
      <CardHeader branch="profile" title="프로필 보기" />
      <div className="mb-3 flex items-start gap-3">
        <Profile />
      </div>
      <div className="flex gap-2 pb-2 overflow-x-auto">
        {selectedUser?.interests.map((item) => (
          <HashTagWrapper key={item.detailLabel} interest={item} />
        ))}
      </div>
      <div className="flex py-2.5">
        <Button children="채팅하기" onClick={() => handleClick(2)} />
      </div>
    </div>
  );
};
