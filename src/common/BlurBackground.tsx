import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const BlurBackground = ({ children }: Props) => {
  return <div className="fixed inset-0 bg-dim-strong px-3">{children}</div>;
};
