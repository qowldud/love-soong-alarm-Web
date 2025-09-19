import { useNavigate } from "react-router-dom";
import { Button } from "../../../common/Button";
import { CardHeader, HashTagWrapper, Profile } from "../../Common";
import { useAuthStore } from "../../../store/authStore";
import { useSelectedUserStore } from "../../../store/useSelectedUserStore";

export const ProfilePreview = () => {
  const navigate = useNavigate();
  const isAuth = useAuthStore((state) => state.isAuth);
  const setIsModalOpen = useAuthStore((state) => state.setIsModalOpen);
  const { selectedUser } = useSelectedUserStore();

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
        <Button
          children="채팅하기"
          onClick={() => {
            if (!isAuth) {
              setIsModalOpen({ flag: true, type: "chat" });
              return;
            }
            navigate("/chat/1");
          }}
        />
      </div>
    </div>
  );
};
