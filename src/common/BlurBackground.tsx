import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

export const BlurBackground = ({ children, onClick }: Props) => {
  return (
    <div
      className="absolute inset-0 bg-dim-strong px-3 flex items-center justify-center z-200"
      onClick={onClick}
    >
      <div className="max-w-[444px] px-3">{children}</div>
    </div>
  );
};
