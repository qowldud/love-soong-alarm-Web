import { useAuthStore } from "../store/authStore";
import { useHomeStore } from "../store/homeStore";

import Close from "@/assets/icons/ic_close.svg";
import { useSelectedUserStore } from "../store/useSelectedUserStore";
import type { UserInterest } from "../types/User";
import clsx from "clsx";
import type { ChatDetail } from "../types/chat";

export const CardHeader = ({
  branch,
  title,
}: {
  branch?: "profile" | "chat";
  title: string;
}) => {
  const setResetHome = useHomeStore((state) => state.setReset);
  const setResetAuth = useAuthStore((state) => state.setReset);

  const handleReset = () => {
    setResetHome(branch);
    setResetAuth();
  };

  return (
    <>
      <button
        onClick={() => handleReset()}
        className=" rounded-full p-2 text-gray-500 hover:bg-gray-100"
        aria-label="닫기"
      />
      <div className="flex justify-between px-1 pb-3.5">
        <div className="text-[24px] font-bold text-[#231D33]">{title}</div>
        <img
          src={Close}
          alt={"close"}
          onClick={() => handleReset()}
          className="cursor-pointer"
        />
      </div>
    </>
  );
};

export const Hashtag_v2 = ({
  item,
}: {
  item: { label: string; hashtags: string[] };
}) => {
  return (
    <div className="flex items-center gap-x-1.5 shrink-0">
      <span className="inline-flex shrink-0 whitespace-nowrap text-main1 bg-main3 text-[12px] px-1.5 py-0.5 rounded-[4px]">
        #{item.label}
      </span>
      {item.hashtags.map((it, i) => (
        <span
          key={i}
          className="inline-flex shrink-0 whitespace-nowrap bg-[#AD929B]/8 text-[#331D24]/60 text-[12px] px-1.5 py-0.5 rounded-[4px]"
        >
          #{it}
        </span>
      ))}
    </div>
  );
};

export const ProfileLabel = ({ chatDetail }: { chatDetail: ChatDetail }) => {
  return (
    <div className="flex flex-row gap-x-3 items-center">
      <div>{chatDetail.partner.emoji}</div>
      <div className="flex flex-col">
        <div className="text-[18px]">{chatDetail.partner.nickname}</div>
        <div className="text-[12px] text-[#331D24]/80">
          {chatDetail.partner.age}세 | {chatDetail.partner.major}
        </div>
      </div>
    </div>
  );
};

export const Hashtag = ({
  label,
  isHashTag,
}: {
  label: string;
  isHashTag: boolean;
}) => {
  return (
    <div
      className={clsx(
        "text-xs font-medium leading-4.5 tracking-[-0.24px] px-1.5 py-1 rounded-sm",
        isHashTag ? "text-additive bg-fill-strong" : "text-main1 bg-main3"
      )}
    >
      {isHashTag ? "" : "#"}
      {label}
    </div>
  );
};

export const HashTagWrapper = ({ interest }: { interest: UserInterest }) => (
  <div className="flex gap-2">
    <Hashtag label={interest.detailLabel} isHashTag={false} />

    {interest.hashTags.map((tag) => (
      <Hashtag label={tag} isHashTag={true} />
    ))}
  </div>
);

export const Profile = () => {
  const { selectedUser } = useSelectedUserStore();

  return (
    <div className="flex gap-2 items-center py-2.5 w-full">
      <div>{selectedUser?.emoji}</div>
      <div className="flex flex-col flex-1 px-1">
        <div className="text-lg">{selectedUser?.name}</div>
        <div className="text-xs text-additive">
          {selectedUser?.age}세 | {selectedUser?.major}
        </div>
      </div>

      <div className="px-1.5 py-0.5 rounded-sm bg-success-regular">
        <span className="text-success-strong text-xs font-medium leading-4.5 tracking-[-0.24px]">
          10분 내 접속
        </span>
      </div>
    </div>
  );
};
