import Edit from "@/assets/icons/ic_edit.svg";

import { PROFILE_MOCK } from "../../hooks/mocks";
import { Button_v2 } from "../../common/Button";

const hashtag = ({ label, isActive }: { label: string; isActive: boolean }) => {
  return (
    <div
      className={`${
        isActive ? "text-main1 bg-main3" : "bg-[#AD929B]/8 text-[#331D24]/20"
      } text-[12px] px-1.5 py-0.5 rounded-[4px]`}
    >
      #{label}
    </div>
  );
};

export const ProfileCard = () => {
  return (
    <div className="flex flex-col gap-y-1 p-4 bg-white rounded-[16px]">
      <div className="px-1 text-[#331D24]/60 font-light">
        상대방에게 보일 내 프로필
      </div>
      <div className="flex flex-row justify-between items-center py-2.5">
        <div className="flex flex-row gap-x-3 items-center">
          <div>🌿</div>
          <div className="flex flex-col">
            <div className="text-[18px]">조휴일</div>
            <div className="text-[12px] text-[#331D24]/80">
              20세 | 경영학부 | 182cm
            </div>
          </div>
        </div>
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
