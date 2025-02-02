import { FC, useContext, useState } from "react";
import { ColorsPalette } from "../molecules/ColorsPalette";
import { MoveHandle } from "../atoms/MoveHandle";
import { DeleteHandle } from "../atoms/DeleteHandle";
import { ResizeHandle } from "../atoms/ResizeHandle";
import { useMoveResizer } from "../../hooks/use-move-resizer";
import { AppContext, FieldType } from "../../context/AppContext";
import { ColorType } from "../atoms/TextColor";

export type TextAreaProps = {
  id: FieldType["id"];
  selectedColor: ColorType[number];
  parentRef: React.RefObject<HTMLElement>;
  text: string;
  placeholder: string;
};

export const TextArea: FC<TextAreaProps> = ({
  id,
  selectedColor,
  parentRef,
  text,
  placeholder,
}) => {
  const { removeField } = useContext(AppContext);

  const { position, dimensions, handleMoveMouseDown, handleResizeMouseDown } =
    useMoveResizer({
      initialPosition: { x: 229, y: 446 },
      initialSize: { width: 350, height: 120 },
      minSize: 100,
      parentRef,
    });

  const [textAreaValue, setTextAreaValue] = useState<string>(text);

  return (
    <div
      className="absolute w-[350px] h-[120px] py-3 px-6 border-2 border-[var(--primary)] flex justify-center items-center"
      style={{
        width: dimensions.width,
        height: dimensions.height,
        top: position.y,
        left: position.x,
      }}
    >
      <MoveHandle onMouseDown={handleMoveMouseDown} />
      <DeleteHandle
        onClick={() => {
          removeField(id);
        }}
      />
      <textarea
        className={`w-full h-full text-display text-center resize-none outline-none overflow-hidden placeholder:text-[var(--black)] placeholder:opacity-25`}
        placeholder={placeholder}
        style={{
          color: `var(--${selectedColor})`,
        }}
        onChange={(e) => {
          setTextAreaValue(e.currentTarget.value);
        }}
        value={textAreaValue}
      ></textarea>
      <ResizeHandle onMouseDown={handleResizeMouseDown} />
      <ColorsPalette
        fieldId={id}
        className="absolute top-full left-0.25 translate-y-[7px]"
        selectedColor={selectedColor}
      />
    </div>
  );
};
