import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";
import Edit from "@/assets/icons/ic_edit.svg";
import Alert from "@/assets/icons/ic_alert.svg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "disabled" | "secondary";
  branch?: string;
}

export const Button = ({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: "bg-main1 text-white",
    disabled: "bg-main1 text-white opacity-32",
    secondary: "bg-main3 text-main1",
  };
  return (
    <button
      className={clsx(
        "w-full h-14 flex items-center justify-center rounded-xl text-base font-medium cursor-pointer",
        variants[variant],
        className
      )}
      disabled={variant === "disabled"}
      {...props}
    >
      {children}
    </button>
  );
};

export const Button_v2 = ({ branch, ...props }: ButtonProps) => {
  switch (branch) {
    case "EDIT":
      return (
        <button
          className="flex flex-row gap-x-1 truncate bg-[#AD929B]/8 text-[12px] text-[#331D24] rounded-[8px] p-2.5"
          {...props}
        >
          <img src={Edit} alt={"edit"} />
          수정
        </button>
      );
    case "ALERT":
      return (
        <button
          className="flex flex-row gap-x-1 truncate bg-[#AD929B]/8 text-[12px] text-[#331D24] rounded-[8px] p-2.5"
          {...props}
        >
          <img src={Alert} alt={"alert"} />
          차단
        </button>
      );
    default:
      return <></>;
  }
};
