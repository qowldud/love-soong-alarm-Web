import { HOME_PROFILE_CONST } from "../hooks/consts";
import { useAuthStore } from "../store/authStore";
import { useHomeStore } from "../store/homeStore";

import Close from "@/assets/icons/ic_close.svg";

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
        className="absolute right-0 top-0 rounded-full p-2 text-gray-500 hover:bg-gray-100"
        aria-label="닫기"
      />
      <div className="flex justify-between px-1 py-3.5">
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

export const hashtag = ({
  label,
  isActive,
}: {
  label: string;
  isActive: boolean;
}) => {
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

export const ProfileLabel = ({ name }: { name: "jo" | "kim" }) => {
  const USER = HOME_PROFILE_CONST[name];

  return (
    <div className="flex flex-row gap-x-3 items-center">
      <div>{USER.emoji}</div>
      <div className="flex flex-col">
        <div className="text-[18px]">{USER.name}</div>
        <div className="text-[12px] text-[#331D24]/80">
          {USER.age}세 | {USER.dept} | {USER.height}cm
        </div>
      </div>
    </div>
  );
};
