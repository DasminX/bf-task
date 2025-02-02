import { FC, memo, useContext } from "react";
import { TEXT_COLORS } from "../../utils/constants";
import { ColorType, TextColor } from "../atoms/TextColor";
import { AppContext, FieldType } from "../../context/AppContext";
import { cn } from "../../functions/cn";

export type ColorsPaletteProps = {
  fieldId: FieldType["id"];
  selectedColor: ColorType[number];
  className?: string;
};
export const ColorsPalette: FC<ColorsPaletteProps> = memo(
  ({ fieldId, selectedColor, className = "" }) => {
    const { updateSelectedColor } = useContext(AppContext);

    return (
      <div className={cn(className, "flex justify-stretch gap-1")}>
        {TEXT_COLORS.map((color) => (
          <TextColor
            key={color}
            color={color}
            selected={color === selectedColor}
            onClick={() => {
              updateSelectedColor(fieldId, color);
            }}
          />
        ))}
      </div>
    );
  }
);
