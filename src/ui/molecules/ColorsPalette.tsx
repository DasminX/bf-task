import { TEXT_COLORS } from "../../constants";
import { TextColor } from "../atoms/TextColor";

export type ColorsPaletteProps = {
  className?: string;
};
export const ColorsPalette = ({ className = "" }) => {
  return (
    <div className={`${className} flex justify-stretch gap-1`}>
      {TEXT_COLORS.map((color) => (
        <TextColor key={color} color={color} selected={false} />
      ))}
    </div>
  );
};
