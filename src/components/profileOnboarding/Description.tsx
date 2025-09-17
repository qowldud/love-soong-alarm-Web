import type { ReactNode } from "react";

interface Props {
  title: string;
  children?: ReactNode;
}

export const Description = ({ title, children }: Props) => {
  return (
    <div className="flex flex-col w-full py-4 px-5 gap-0.5">
      <span className="text-content-base text-lg font-bold">{title}</span>
      <span className="text-additive font-medium text-sm leading-6 tracking-[-0.42px]">
        {children}
      </span>
    </div>
  );
};
