import clsx from "clsx";

interface Props {
  title: string;
  subTitle?: string;
  className?: string;
}

export const SectionHeader = ({ title, subTitle, className }: Props) => {
  return (
    <div
      className={clsx(
        "w-full pt-2 pb-1 flex justify-between items-center",
        className
      )}
    >
      <span className="px-1 text-lg font-bold text-content-base whitespace-nowrap">
        {title}
      </span>
      {subTitle && (
        <span className="px-1 text-sm font-normal text-assistive whitespace-nowrap">
          {subTitle}
        </span>
      )}
    </div>
  );
};
