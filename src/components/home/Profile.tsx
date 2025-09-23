import { useNavigate, useRevalidator } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";

import Logo from "@/assets/icons/purple_logo.svg?url";
import Coin from "@/assets/icons/ic_coin.svg";
import Alarm from "@/assets/icons/ic_alarm.svg";
import Alarm_Notice from "@/assets/icons/ic_unread_notice.svg";
import Setting from "@/assets/icons/ic_setting.svg";
import View from "@/assets/icons/ic_view.svg";
import Reload from "@/assets/icons/ic_reload.svg";

import { Title } from "../../common/Title";
import { Button } from "../../common/Button";
import { useHomeStore } from "../../store/homeStore";
import { toast } from "react-toastify";

export const ProfileCard = ({ userCount }: { userCount: number }) => {
  const revalidate = useRevalidator();
  const navigate = useNavigate();

  const isAuth = useAuthStore((state) => state.isAuth);
  const isNoticeAlarm = useHomeStore((state) => state.isNoticeAlarm);
  const setIsModalOpen = useAuthStore((state) => state.setIsModalOpen);

  if (!isAuth)
    return (
      <div className="flex flex-col bg-white rounded-[16px] py-1.5">
        <div className="w-full px-5 py-4">
          <Title
            title="지금 로그인해서 내 취향을 공유해보세요!"
            sub="흠.. 대충 자극적인 멘트"
          />
        </div>
        <div className="w-full px-4 py-2.5">
          <Button
            variant="primary"
            children="로그인"
            onClick={() => setIsModalOpen({ flag: true, type: "edit" })}
          />
        </div>
      </div>
    );

  return (
    <div className="w-full z-30">
      <div className="flex flex-col bg-white">
        <div className="flex flex-row items-center justify-between py-3.5 px-4">
          <img src={Logo} alt={"Logo"} className="w-8 h-8" />
          <div className="flex flex-row gap-x-4">
            <img
              src={Coin}
              alt={"Coin"}
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                sessionStorage.setItem("Redirect_PATH", "/");
                navigate("/coin");
              }}
            />
            <img
              src={`${isNoticeAlarm ? Alarm_Notice : Alarm}`}
              alt={"Alarm"}
              className="w-6 h-6 cursor-pointer"
              onClick={() => navigate("/alarm")}
            />
            <img
              src={Setting}
              alt={"Setting"}
              className="w-6 h-6 cursor-pointer"
              onClick={() => navigate("/setting")}
            />
          </div>
        </div>

        <div className="flex flex-row items-center justify-between py-2.5 px-4">
          <div className="flex flex-row items-center gap-x-1">
            <img src={View} alt={"View"} className="w-4 h-4" />
            <div className="text-[14px] font-light text-assistive">
              {userCount} 명의 이성이 표시되고 있어요 (최대 6명 표시)
            </div>
          </div>
          <div className="flex flex-row items-center gap-x-1 cursor-pointer">
            <img src={Reload} alt={"Reload"} className="w-5 h-5" />
            <div
              className="text-[14px] font-normal text-additive underline"
              onClick={() => {
                revalidate.revalidate();
                toast.success("새로고침 되었습니다.", {
                  autoClose: 1000,
                });
              }}
            >
              새로고침
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
