import { FC, memo, ReactNode } from "react";
import { cn } from "../../functions/cn";

export type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  className?: string;
};

export const Button: FC<ButtonProps> = memo(
  ({ children, onClick, className = "" }) => {
    return (
      <button
        className={cn(
          `w-32 h-10 cursor-pointer text-button text-center bg-[var(--primary)] transition-colors duration-[250ms] ease-in-out border-none rounded-[5px] hover:bg-[#550788] focus:bg-[var(--primary)] focus:outline-2 focus:outline-[var(--primary50)] disabled:bg-[var(--black25)] disabled:cursor-not-allowed`,
          className
        )}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);
