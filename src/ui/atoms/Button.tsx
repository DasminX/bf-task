import { ButtonHTMLAttributes, FC, memo } from "react";
import { cn } from "../../functions/cn";

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = memo((props) => {
  return (
    <button
      {...props}
      className={cn(
        `w-32 h-10 cursor-pointer text-button text-center bg-[var(--primary)] transition-colors duration-[250ms] ease-in-out border-none rounded-[5px] hover:bg-[#550788] focus:bg-[var(--primary)] focus:outline-2 focus:outline-[var(--primary50)] disabled:bg-[var(--black25)] disabled:cursor-not-allowed`,
        props.className,
      )}>
      {props.children}
    </button>
  );
});
