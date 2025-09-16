import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

import { CardLayout } from "../components/home/Card/Layout";
import { LogoutCard } from "../components/home/Card/Logout";
import { MemberOutcard } from "../components/home/Card/MemberOut";

import Edit from "@/assets/icons/ic_edit.svg";
import Info from "@/assets/icons/ic_info.svg";
import Kakao from "@/assets/icons/ic_kakao.svg";
import Insta from "@/assets/icons/ic_insta.svg";
import Delete from "@/assets/icons/ic_log_delete.svg";
import Logout from "@/assets/icons/ic_color_logout.svg";
import Right_Button from "@/assets/icons/ic_right_button.svg";

const RenderCard = () => (
  <>
    <CardLayout branch="logout">
      <LogoutCard />
    </CardLayout>

    <CardLayout branch="memberout">
      <MemberOutcard />
    </CardLayout>
  </>
);

const List = ({
  onClick,
  img,
  title,
}: {
  onClick: () => void;
  img: string;
  title: string;
}) => {
  return (
    <div className="flex flex-row px-4 py-2.5 items-center justify-between">
      <div className="flex flex-row gap-x-4">
        <img src={img} alt={img} className="w-6 h-6" />
        <div
          className={`${
            title === "로그아웃" ? "text-[#FF244B]" : "text-base"
          } text-[16px]`}
        >
          {title}
        </div>
      </div>
      <img
        src={Right_Button}
        alt={"Button"}
        className="w-4 h-4 cursor-pointer"
        onClick={onClick}
      />
    </div>
  );
};

export const Setting = () => {
  const navigate = useNavigate();

  const setIsMemberOutOpen = useAuthStore((state) => state.setIsMemberOutOpen);
  const setIsLogoutOpen = useAuthStore((state) => state.setIsLogoutOpen);

  return (
    <>
      <div className="flex flex-col w-full h-full justify-between">
        <div className="w-full flex flex-col ">
          <List
            onClick={() => navigate("/")}
            img={Edit}
            title="내 프로필 수정"
          />
          <List
            onClick={() => navigate("/")}
            img={Info}
            title="개인정보 이용약관"
          />

          <div className="w-full h-1 bg-divider-regular my-2.5" />

          <List
            onClick={() => navigate("/")}
            img={Kakao}
            title="카카오톡 문의"
          />
          <List
            onClick={() => navigate("/")}
            img={Insta}
            title="인스타그램 문의"
          />
        </div>
        <div className="flex flex-col">
          <List
            onClick={() => setIsMemberOutOpen(true)}
            img={Delete}
            title="탈퇴하기"
          />
          <List
            onClick={() => setIsLogoutOpen(true)}
            img={Logout}
            title="로그아웃"
          />
        </div>
      </div>

      <RenderCard />
    </>
  );
};
