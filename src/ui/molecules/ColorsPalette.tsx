import { FC, memo, useContext } from "react";
import { TEXT_COLORS } from "../../utils/constants";
import { TextColor } from "../atoms/TextColor";
import { cn } from "../../functions/cn";
import { Color, FieldType } from "../../utils/types";
import { AppContext } from "../../context/AppContextProvider";

export type ColorsPaletteProps = {
  fieldId: FieldType["id"];
  selectedColor: Color;
  className?: string;
};
export const ColorsPalette: FC<ColorsPaletteProps> = memo(({ fieldId, selectedColor, className = "" }) => {
  const { updateSelectedColor } = useContext(AppContext);

  return (
    <div className={cn(className, "flex justify-stretch gap-1")}>
      {TEXT_COLORS.map((color) => (
        <TextColor
          key={color}
          color={color}
          selected={color === selectedColor}
          onSelect={() => updateSelectedColor(fieldId, color)}
        />
      ))}
    </div>
  );
});
