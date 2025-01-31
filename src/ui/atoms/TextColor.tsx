import { FC } from "react";
import { TEXT_COLORS } from "../../constants";

export type ColorType = typeof TEXT_COLORS;
export type TextColorProps = {
  color: ColorType[number];
  selected: boolean;
};

export const TextColor: FC<TextColorProps> = ({ color, selected }) => {
  return (
    <div
      className={`w-6 h-6 rounded-full flex justify-center items-center ${
        selected ? "border-2 border-[var(--white)]" : ""
      }`}
    >
      <div className="w-5 h-5 flex justify-center items-center  bg-transparent">
        <div
          className={`w-4 h-4 bg-[var(--${color})] cursor-pointer rounded-full`}
        ></div>
      </div>
    </div>
  );
};
