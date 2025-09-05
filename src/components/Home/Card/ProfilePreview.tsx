import { Button } from "../../../common/Button";
import { PROFILE_MOCK } from "../../../hooks/mocks";
import { CardHeader, hashtag, ProfileLabel } from "../Common";

export const ProfilePreview = () => {
  return (
    <div className="relative">
      <CardHeader branch="profile" title="프로필 보기" />
      <div className="mb-3 flex items-start gap-3">
        <ProfileLabel name="kim" />
      </div>
      <div className="flex flex-row gap-x-1.5 py-2 overflow-x-scroll justify-center">
        {PROFILE_MOCK.map((item, index) => (
          <div key={index}>{hashtag(item)}</div>
        ))}
      </div>
      <div className="flex py-2.5">
        <Button children="채팅하기" />
      </div>
    </div>
  );
};
