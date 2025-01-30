import { FC, ReactNode } from "react";

export type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

export const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="w-32 h-10 cursor-pointer text-button text-center bg-[var(--primary)] transition-colors duration-[250] ease-in-out border-none outline-none rounded-[5px] hover:bg-[#550788] focus:bg-[var(--primary)] focus:outline-2 focus:outline[var(--primary50)] disabled:bg-[var(--black25)]"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
