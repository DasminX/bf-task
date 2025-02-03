import { FC, memo, useCallback, useContext } from "react";
import { TEXT_COLORS } from "../../utils/constants";
import { TextColor } from "../atoms/TextColor";
import { Color, FieldType } from "../../utils/types";
import { AppContext } from "../../context/AppContextProvider";

export type ColorsPaletteProps = {
  fieldId: FieldType["id"];
  selectedColor: Color;
  className?: string;
};
export const ColorsPalette: FC<ColorsPaletteProps> = memo(({ fieldId, selectedColor, className = "" }) => {
  const { updateSelectedColor } = useContext(AppContext);

  const onUpdateSelectedColorHandler = useCallback(
    (color: Color) => {
      updateSelectedColor(fieldId, color);
    },
    [updateSelectedColor],
  );

  return (
    <div className={className}>
      {TEXT_COLORS.map((color) => (
        <TextColor
          key={color}
          color={color}
          selected={color === selectedColor}
          onSelect={onUpdateSelectedColorHandler}
        />
      ))}
    </div>
  );
});
