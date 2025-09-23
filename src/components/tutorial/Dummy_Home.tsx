import { HOME_CONST } from "../../hooks/consts";

export const Dummy_Home = () => (
  <button className="flex flex-1 flex-col justify-center items-center bg-main1 px-4 py-2 rounded-xl text-white">
    <div className="text-sm font-bold whitespace-nowrap">
      {`${HOME_CONST.yes.title[0]}`} {1}
      {`${HOME_CONST.yes.title[1]}`}
    </div>
    <div className="text-xs">{`${HOME_CONST.yes.label}`}</div>
  </button>
);

export const Dummy_Button = ({ children }: { children: React.ReactNode }) => (
  <button className="p-4 bg-white rounded-[12px]">{children}</button>
);
