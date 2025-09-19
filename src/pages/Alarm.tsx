import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";
import { useHomeStore } from "../store/homeStore";

import { ALARM_CONST } from "../hooks/consts";

import Close from "@/assets/icons/ic_close.svg";
import Check from "@/assets/icons/ic_check.svg";
import Error from "@/assets/icons/ic_error.svg";
import {
  deleteAllAlarm,
  deleteIndivAlarm,
  readAllAlarm,
  readIndivAlarm,
} from "../api/notice";
import { toast } from "react-toastify";

type ListProps = {
  id: number;
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
  const revalidator = useRevalidator();

  const handleRead = async () => {
    if (type === "before") {
      const response = await readAllAlarm();

      if (response!.success) {
        revalidator.revalidate();
        toast.success("알람을 모두 읽었습니다.");
      }
    } else {
      const response = await deleteAllAlarm();

      if (response!.success) {
        revalidator.revalidate();
        toast.success("알람을 모두 지웠습니다.");
      }
    }
  };

  return (
    <div className="flex flex-row justify-between items-center py-2">
      <div className="text-[18px] font-bold">{LABEL.title}</div>
      <div
        className="flex flex-row gap-x-1 cursor-pointer"
        onClick={() => handleRead()}
      >
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
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const setCheckProfile = useHomeStore((state) => state.setCheckProfile);

  const handleClick = async ({ id }: { id: number }) => {
    if (type === "before") {
      const response = await readIndivAlarm({ notificationId: id });

      if (response!.success) {
        navigate("/");
        setCheckProfile(true);
      }
    } else {
      navigate("/");
      setCheckProfile(true);
    }
  };

  const handleDelete = async ({ id }: { id: number }) => {
    const response = await deleteIndivAlarm({ notificationId: id });

    if (response!.success) {
      revalidator.revalidate();
      toast.success("알림이 삭제되었습니다.");
    }
  };

  return (
    <div
      className="w-full py-2.5 flex flex-row justify-between items-center"
      onClick={() => handleClick({ id: Number(item.id) })}
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
          <img
            src={Close}
            className="w-4 h-4 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete({ id: Number(item.id) });
            }}
          />
        )}
      </div>
    </div>
  );
};

const ERROR_VALID = false;

export const Alarm = () => {
  const { alarmList } = useLoaderData();
  console.log(alarmList);

  if (ERROR_VALID) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-y-2">
        <img src={Error} alt={"Error"} />
        <div className="text-content-disabled font-bold text-[20px]">
          알림 내용이 없어요
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className=" flex flex-col overflow-y-scroll gap-y-2 divide-y-2 divide-[#EDEBF2]">
        <div className="px-4 py-2.5">
          <Title type="before" />
          {ALARM_CONST.before.map((item, index) => (
            <List key={index} item={item} type="before" />
          ))}
        </div>

        <div className="px-4 py-2.5">
          <Title type="after" />
          {ALARM_CONST.after.map((item, index) => (
            <List key={index} item={item} type="after" />
          ))}
        </div>
      </div>
    </div>
  );
};
