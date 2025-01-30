import { FC } from "react";

export type ColorType = "black" | "white" | "red" | "blue" | "green";
export type TextColorProps = {
  color: ColorType;
  selected: boolean;
};

export const TextColor: FC<TextColorProps> = ({ color, selected }) => {
  return (
    <div className="w-6 h-6 flex justify-center items-center">
      <div
        className={`w-4 h-4 bg-[var(--${color})] cursor-pointer rounded-full ${
          selected
            ? "border-4 border-transparent ring-4 ring-[var(--white)]"
            : "border-none"
        }`}
      ></div>
    </div>
  );
};
