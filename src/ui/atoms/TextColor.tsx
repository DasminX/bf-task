import { FC, MouseEventHandler } from "react";
import { TEXT_COLORS } from "../../utils/constants";
import { cn } from "../../functions/cn";

export type ColorType = typeof TEXT_COLORS;
export type TextColorProps = {
  color: ColorType[number];
  selected: boolean;
  onClick: MouseEventHandler;
};

export const TextColor: FC<TextColorProps> = ({ color, selected, onClick }) => {
  return (
    <div
      className={cn(
        "w-6 h-6 rounded-full flex justify-center items-center",
        selected && "border-2 border-[var(--white)]"
      )}
    >
      <div className="w-5 h-5 flex justify-center items-center  bg-transparent">
        <div
          onClick={onClick}
          className={`w-4 h-4 cursor-pointer rounded-full`}
          style={{
            backgroundColor: color,
          }}
        ></div>
      </div>
    </div>
  );
};
