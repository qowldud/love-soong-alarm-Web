import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const BlurBackground = ({ children }: Props) => {
  return (
    <div className="fixed inset-0 bg-dim-strong px-3 flex items-center justify-center z-50">
      <div className="max-w-[444px] px-3 ">{children}</div>
    </div>
  );
};
