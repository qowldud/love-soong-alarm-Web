import { PROFILE_MOCK } from "../../hooks/mocks";
import { Button_v2 } from "../../common/Button";

import { hashtag, ProfileLabel } from "./Common";

export const ProfileCard = () => {
  return (
    <div className="flex flex-col gap-y-1 p-4 bg-white rounded-[16px]">
      <div className="px-1 text-[#331D24]/60 font-light">
        상대방에게 보일 내 프로필
      </div>
      <div className="flex flex-row justify-between items-center py-2.5">
        <ProfileLabel name="jo" />
        <Button_v2 branch="EDIT" />
      </div>
      <div className="flex flex-row gap-x-1.5 overflow-x-scroll justify-center">
        {PROFILE_MOCK.map((item, index) => (
          <div key={index}>{hashtag(item)}</div>
        ))}
      </div>
    </div>
  );
};
