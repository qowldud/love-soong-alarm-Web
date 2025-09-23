import Close from "@/assets/icons/ic_close.svg";

import React from "react";

type ColorHashtagProps = {
  children: React.ReactNode;
};

const Color_Hashtag: React.FC<ColorHashtagProps> = ({ children }) => (
  <div className="px-1.5 py-0.5 bg-main3 text-main1 text-xs font-medium rounded-sm min-w-max">
    #{children}
  </div>
);

const Hashtag: React.FC<ColorHashtagProps> = ({ children }) => (
  <div className="px-1.5 py-0.5 bg-fill-strong text-additive text-xs font-medium rounded-sm min-w-max">
    #{children}
  </div>
);

export const Dummy_Profile = () => (
  <div className="relative">
    <div className="flex flex-col w-full pb-3 gap-y-">
      <div className="flex flex-row justify-between items-center py-4">
        <div className="text-content-base text-2xl font-bold">프로필 보기</div>
        <img src={Close} alt={"Close"} className="w-4 h-4" />
      </div>

      <div className="flex flex-row justify-between items-center py-2.5">
        <div className="flex flex-row gap-x-3.5 items-center">
          <div>🎧</div>
          <div className="flex flex-col">
            <div className="text-content-base text-lg font-medium">김숭실</div>
            <div className="text-additive text-xs font-normal">
              22세 | 컴퓨터학부
            </div>
          </div>
        </div>
        <div className="text-xs font-medium bg-success-regular text-success-strong px-1.5 py-0.5 rounded-sm">
          10분 내 접속
        </div>
      </div>

      <div className="w-full py-2 ">
        <div className="flex flex-row gap-x-2 overflow-x-auto overflow-y-hidden w-full">
          <Color_Hashtag>밴드</Color_Hashtag>
          <Hashtag>검정치마</Hashtag>
          <Hashtag>The1975</Hashtag>
          <Color_Hashtag>영화</Color_Hashtag>
          <Hashtag>에에올</Hashtag>
          <Hashtag>드마카</Hashtag>
        </div>
      </div>

      <div className=" py-2.5 w-full">
        <div className="flex items-center rounded-xl justify-center w-full px-4 py-4 text-white bg-main1">
          채팅하기
        </div>
      </div>
    </div>
  </div>
);
