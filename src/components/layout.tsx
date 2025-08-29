import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="flex w-dvw h-dvh items-center justify-center bg-gray-600">
      <div className="flex max-w-[440px] min-w-[375px] flex-1 justify-center items-center flex-col h-full overflow-y-hidden bg-white">
        <Outlet />
      </div>
    </div>
  );
};
