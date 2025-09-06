import { PROFILE_MOCK } from "../../hooks/mocks";
import { Button_v2 } from "../../common/Button";

import { hashtag, ProfileLabel } from "../Common";

export const ChatCard = () => {
  return (
    <div className="relative flex flex-col gap-y-1 bg-white px-4 py-2.5 w-full">
      <div className="flex flex-row justify-between items-center py-2.5">
        <ProfileLabel name="jo" />
        <Button_v2 branch="ALERT" />
      </div>

      <div className="flex flex-row gap-x-1.5 overflow-x-scroll py-2">
        {PROFILE_MOCK.map((item, index) => (
          <div key={index}>{hashtag(item)}</div>
        ))}
      </div>

      <div className="absolute top-30 left-0 w-full h-1 pointer-events-none bg-gradient-to-b to-transparent from-gray-200/60"></div>
    </div>
  );
};
