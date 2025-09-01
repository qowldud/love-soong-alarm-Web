import clsx from "clsx";

interface Props {
  label: string;
  select?: boolean;
  onClick: () => void;
}

export const OptionButton = ({ label, select = false, onClick }: Props) => {
  return (
    <button
      className={clsx(
        "rounded-lg h-11 flex-1 flex items-center justify-center text-base font-normal cursor-pointer",
        select
          ? "border-2 border-main1 text-main1 bg-main3"
          : "text-content-disabled bg-fill-regular"
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
