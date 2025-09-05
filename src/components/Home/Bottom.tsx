import type { ButtonHTMLAttributes } from "react";

import { HOME_CONST } from "../../hooks/consts";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  count: number;
}

export const HomeBottom = ({ count, ...props }: ButtonProps) => {
  if (count) {
    return (
      <button
        className="flex w-full h-full flex-col justify-center items-center bg-main1 px-4 py-2 rounded-[12px] text-white"
        {...props}
      >
        <div className="text-[14px] font-bold">
          {`${HOME_CONST.yes.title[0]}`} {count}
          {`${HOME_CONST.yes.title[1]}`}
        </div>
        <div className="text-[12px]">{`${HOME_CONST.yes.label}`}</div>
      </button>
    );
  } else {
    return (
      <div className="flex w-full h-full flex-col justify-center items-center bg-main2 px-4 py-2 rounded-[12px]">
        <div className="text-main1 text-[14px] font-bold">{`${HOME_CONST.no.title}`}</div>
        <div className="text-main1 text-[12px] font-light">{`${HOME_CONST.no.label}`}</div>
      </div>
    );
  }
};
