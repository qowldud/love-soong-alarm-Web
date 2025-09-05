import clsx from "clsx";
import CloseIcon from "@/assets/icons/close.svg?url";

const variantStyles = {
  interest: "bg-main3 text-main1 font-normal",
  detail: "bg-fill-regular text-disabled backdrop-blur-md",
} as const;

const variantSelectedStyles = {
  interest: "bg-main1 text-white font-normal",
  detail: "bg-fill-inverted text-inverted font-normal backdrop-blur-md",
} as const;

interface Props {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  variant?: keyof typeof variantStyles;
  removable?: boolean;
  className?: string;
}

export const Chip = ({
  label,
  selected = false,
  onClick,
  variant = "interest",
  removable = false,
  className,
}: Props) => {
  return (
    <div
      className={clsx(
        "px-2 py-1.5 text-sm font-bold flex rounded-lg cursor-pointer",
        selected ? variantSelectedStyles[variant] : variantStyles[variant],
        className
      )}
      onClick={onClick}
    >
      <span className="px-0.5 whitespace-nowrap">{label}</span>
      {removable && (
        <button className="ml-1">
          <img src={CloseIcon} />
        </button>
      )}
    </div>
  );
};
