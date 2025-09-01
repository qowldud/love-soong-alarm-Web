import { Outlet } from "react-router-dom";

import { Header } from "../common/Header";

export const Auth = () => {
  return (
    <>
      <Header title="시작하기" />
      <Outlet />
    </>
  );
};
