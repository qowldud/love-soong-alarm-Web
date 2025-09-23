import { useNavigate } from "react-router-dom";
import { Button } from "../../../common/Button";
import { CardHeader, HashTagWrapper, Profile } from "../../Common";
import { useSelectedUserStore } from "../../../store/useSelectedUserStore";

import { useApi } from "../../../api/api";
import type { MakeChat } from "../../../types/chat";
import { toast } from "react-toastify";
import { useChatStore } from "../../../store/chatStore";
import { useEffect, useState } from "react";
import { LoginModal } from "../LoginModal";
import { useAuthStore } from "../../../store/authStore";
import { checkUserProfile, fetchMyProfile } from "../../../api/auth";
import type { NormalizedProfile } from "../../../types/User";
import { normalizeProfile } from "../../../lib/normalizers/normalizeProfile";
import { MockPeople } from "../../../constants/mockPeople";
import mixpanel from "mixpanel-browser";

export const ProfilePreview = () => {
  const navigate = useNavigate();
  const { postData } = useApi();
  const { selectedUserId } = useSelectedUserStore();
  const { isAuth } = useAuthStore();
  const [loginModal, setLoginModal] = useState(false);
  const [selectUser, setSelectUser] = useState<NormalizedProfile | null>(null);

  const accessToken = localStorage.getItem("accessToken");
  const setReachMax = useChatStore((state) => state.setReachMax);

  const handleClick = async (userId?: number | null) => {
    if (!isAuth || !accessToken) {
      setLoginModal(true);
      return;
    }

    if (selectedUserId === -1) {
      navigate("/edit");
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
      mixpanel.track("Chat_Start", {
        entry_point: "map",
        chat_id: response.data.chatRoomId,
      });
      navigate(`/chat/${response.data.chatRoomId}`);
    } else toast.warn(response.message);
  };

  const getUserProfile = async (userId: number) => {
    try {
      const res = await checkUserProfile({ userId });

      if (res?.data) {
        const user = normalizeProfile(res.data, "user");
        setSelectUser(user);
      }
    } catch (err) {}
  };

  const getMyProfile = async () => {
    try {
      const res = await fetchMyProfile();

      if (res?.data) {
        const user = normalizeProfile(res.data, "my");
        setSelectUser(user);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (selectedUserId && selectedUserId < -5) {
      const mockUser = MockPeople.find(
        (user) => user.userId === selectedUserId
      );
      if (mockUser) {
        const userObj = {
          ...mockUser,
          id: mockUser.userId,
          lastSeen:
            typeof mockUser.lastSeen === "string" ? mockUser.lastSeen : "",
        };
        const user = normalizeProfile(userObj, "user");
        setSelectUser(user);
      }
      return;
    }

    if (selectedUserId === -1) {
      getMyProfile();
    } else {
      if (selectedUserId) {
        getUserProfile(selectedUserId);
      }
    }
  }, [selectedUserId]);

  return (
    <>
      {loginModal && (
        <LoginModal type="chat" handleClose={() => setLoginModal(false)} />
      )}
      <div className="relative">
        <CardHeader
          branch="profile"
          title={selectedUserId === -1 ? "내 프로필 보기" : "프로필 보기"}
        />
        <div className="mb-3 flex items-start gap-3">
          <Profile
            emoji={selectUser?.emoji ?? ""}
            name={selectUser?.name ?? ""}
            age={selectUser?.age ?? 0}
            major={selectUser?.major ?? ""}
            lastSeen={selectUser?.lastSeen ?? ""}
          />
        </div>
        <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-none">
          {selectUser?.interests.map((item) => (
            <HashTagWrapper key={item.detailLabel} interest={item} />
          ))}
        </div>
        <div className="flex py-2.5 safe-bottom">
          <Button
            children={selectedUserId === -1 ? "수정하기" : "채팅하기"}
            onClick={() => handleClick(selectedUserId)}
          />
        </div>
      </div>
    </>
  );
};
