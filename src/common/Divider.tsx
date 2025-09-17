import clsx from "clsx";

interface Props {
  className?: string;
}

export const Divider = ({ className }: Props) => {
  return (
    <div className={clsx("w-full py-2.5", className)}>
      <div className="w-full h-[1px] bg-divider-regular"></div>
    </div>
  );
};
