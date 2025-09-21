import type { ButtonHTMLAttributes } from "react";

import { HOME_CONST } from "../../hooks/consts";
import { useAuthStore } from "../../store/authStore";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { postLocation } from "../../api/location";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  count: number;
}

export const HomeBottom = ({ count, ...props }: ButtonProps) => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const { locationData } = useLoaderData();
  const { revalidate } = useRevalidator();

  const onRefresh = async () => {
    if (!navigator.geolocation) {
      console.log("이 브라우저는 위치 정보를 지원하지 않아요!");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      try {
        await postLocation({ latitude, longitude });
        revalidate();
      } catch (err) {
        console.error(err);
      }
    });
  };

  if (!isAuth)
    return (
      <button
        className="flex flex-1 flex-col justify-center items-center bg-main1 px-4 py-2 rounded-lg text-white"
        {...props}
      >
        <div className="text-sm font-bold">
          {`${HOME_CONST.yes.title[0]}`} n{`${HOME_CONST.yes.title[1]}`}
        </div>
        <div className="text-xs">{`${HOME_CONST.yes.label}`}</div>
      </button>
    );

  if (!locationData) {
    return (
      <button
        className="flex flex-1 items-center justify-center bg-main3 text-main1 rounded-lg py-4 cursor-pointer"
        onClick={onRefresh}
      >
        새로고침
      </button>
    );
  }

  if (count) {
    return (
      <button
        className="flex flex-1 flex-col justify-center items-center bg-main1 px-4 py-2 rounded-xl text-white"
        {...props}
      >
        <div className="text-sm font-bold">
          {`${HOME_CONST.yes.title[0]}`} {count}
          {`${HOME_CONST.yes.title[1]}`}
        </div>
        <div className="text-xs">{`${HOME_CONST.yes.label}`}</div>
      </button>
    );
  } else {
    return (
      <div className="flex flex-1 flex-col justify-center items-center bg-fill-interactive px-4 py-2.5 rounded-xl shadow-dim-regular backdrop-blur-2xl">
        <div className="text-content-base text-sm font-bold">{`${HOME_CONST.no.title}`}</div>
        <div className="text-additive text-xs font-light">{`${HOME_CONST.no.label}`}</div>
      </div>
    );
  }
};
