import { Outlet } from "react-router-dom";

export const PrivateLayout = () => {
  return (
    <>
      {/* 로그인 여부 로직 */}
      <Outlet />
    </>
  );
};
