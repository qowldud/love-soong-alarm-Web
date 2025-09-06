import { ALARM_CONST } from "../../../hooks/consts";
import { CardHeader } from "../Common";

import Close from "@/assets/icons/ic_close.svg";
import Check from "@/assets/icons/ic_check.svg";
import { useHomeStore } from "../../../store/homeStore";

type ListProps = {
  title: string;
  content: string;
  time: string;
};

const CheckLabel = (type: "before" | "after") => {
  if (type === "before")
    return { title: "새 알림", button: "모두 읽기", img: Check };
  else return { title: "읽은 알림", button: "모두 지우기", img: Close };
};

const Title = ({ type }: { type: "before" | "after" }) => {
  const LABEL = CheckLabel(type);

  return (
    <div className="flex flex-row justify-between items-center py-2">
      <div className="text-[18px] font-bold">{LABEL.title}</div>
      <div className="flex flex-row gap-x-1">
        <img src={LABEL.img} />
        <div className="text-[#231D33]/60 text-[14px]">{LABEL.button}</div>
      </div>
    </div>
  );
};

const List = ({
  item,
  type,
}: {
  item: ListProps;
  type: "before" | "after";
}) => {
  const setCheckProfile = useHomeStore((state) => state.setCheckProfile);

  return (
    <div
      className="w-full py-2.5 flex flex-row justify-between items-center"
      onClick={() => setCheckProfile(true)}
    >
      <div className="flex flex-col">
        <div className="text-[16px]">{item.title}</div>
        <div className="text-[12px] font-light text-[#231D33]/80">
          {item.content}
        </div>
      </div>
      <div className="flex flex-row gap-x-2 items-center">
        <div className="text-[12px] font-light text-[#231D33]/60">
          {item.time}
        </div>
        {type === "before" ? (
          <div className="bg-main1 w-1.5 h-1.5 rounded-full" />
        ) : (
          <img src={Close} className="w-4 h-4" />
        )}
      </div>
    </div>
  );
};

export const AlramPreview = () => {
  return (
    <div className="relative">
      <CardHeader branch="alarm" title="알림" />
      <div className=" flex flex-col overflow-y-scroll">
        <Title type="before" />
        {ALARM_CONST.before.map((item, index) => (
          <List key={index} item={item} type="before" />
        ))}

        <Title type="after" />
        {ALARM_CONST.after.map((item, index) => (
          <List key={index} item={item} type="after" />
        ))}
      </div>
    </div>
  );
};
