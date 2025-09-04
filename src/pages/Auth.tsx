import { Outlet } from "react-router-dom";

import { Header } from "../common/Header";

export const Auth = () => {
  return (
    <div className="flex flex-col h-full">
      <Header title="시작하기" />
      <Outlet />
    </div>
  );
};
