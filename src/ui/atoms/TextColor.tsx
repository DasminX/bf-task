import { FC, memo } from "react";
import { cn } from "../../functions/cn";
import { Color } from "../../utils/types";

export type TextColorProps = {
  color: Color;
  selected: boolean;
  onSelect: (color: Color) => void;
};

export const TextColor: FC<TextColorProps> = memo(({ color, selected, onSelect }) => {
  return (
    <div
      className={cn(
        "w-6 h-6 rounded-full flex justify-center items-center",
        selected && "border-2 border-[var(--white)]",
      )}>
      <div className="w-5 h-5 flex justify-center items-center  bg-transparent">
        <div
          onClick={() => onSelect(color)}
          className={`w-4 h-4 cursor-pointer rounded-full`}
          style={{
            backgroundColor: color,
          }}></div>
      </div>
    </div>
  );
});
