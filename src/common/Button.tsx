import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "disabled" | "secondary";
}

export const Button = ({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: "bg-main1 text-white",
    disabled: "bg-main2 text-white",
    secondary: "bg-main3 text-main1",
  };
  return (
    <button
      className={clsx(
        "w-full h-14 flex items-center justify-center rounded-xl text-base font-medium",
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
