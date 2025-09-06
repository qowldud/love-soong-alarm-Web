import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ChipStack = ({ children }: Props) => {
  return <div className="w-full py-2.5 flex flex-wrap gap-2">{children}</div>;
};
