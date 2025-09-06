import { useNavigate } from "react-router-dom";
import { Button } from "../../../common/Button";
import { PROFILE_MOCK } from "../../../hooks/mocks";
import { CardHeader, hashtag, ProfileLabel } from "../../Common";

export const ProfilePreview = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <CardHeader branch="profile" title="프로필 보기" />
      <div className="mb-3 flex items-start gap-3">
        <ProfileLabel name="kim" />
      </div>
      <div className="flex flex-row gap-x-1.5 py-2 overflow-x-scroll ">
        {PROFILE_MOCK.map((item, index) => (
          <div key={index}>{hashtag(item)}</div>
        ))}
      </div>
      <div className="flex py-2.5">
        <Button children="채팅하기" onClick={() => navigate("/chat/1")} />
      </div>
    </div>
  );
};
