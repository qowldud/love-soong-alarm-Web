import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import Close from "@/assets/icons/close.svg?url";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onClear?: () => void;
}

export const Input = ({ label, className, onClear, ...props }: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <div className="w-full px-1 pb-2 text-sm font-medium text-additive">
          {label}
        </div>
      )}

      <div className="flex gap-2 items-center rounded-xl w-full px-4 py-3 bg-fill-regular backdrop-blur-md placeholder:text-assistive text-base">
        <input {...props} className={clsx("flex-1 outline-none", className)} />
        <img
          src={Close}
          alt="close"
          className="cursor-pointer"
          onClick={onClear}
        />
      </div>
    </div>
  );
};
