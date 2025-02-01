import { FC, useContext, useState } from "react";
import { ColorsPalette } from "../molecules/ColorsPalette";
import { MoveHandle } from "../atoms/MoveHandle";
import { DeleteHandle } from "../atoms/DeleteHandle";
import { ResizeHandle } from "../atoms/ResizeHandle";
import { useMoveResizer } from "../../hooks/use-move-resizer";
import { AppContext, FieldType } from "../../context/AppContext";

export type TextAreaProps = {
  id: FieldType["id"];
  parentRef: React.RefObject<HTMLElement>;
  text: string;
  placeholder: string;
  active: FieldType["active"];
};

export const TextArea: FC<TextAreaProps> = ({
  id,
  parentRef,
  text,
  placeholder,
  active,
}) => {
  const { removeField } = useContext(AppContext);

  const { position, dimensions, handleMoveMouseDown, handleResizeMouseDown } =
    useMoveResizer({
      initialPosition: { x: 229, y: 446 },
      initialSize: { height: 120, width: 350 },
      minSize: 100,
      parentRef,
    });

  const [textAreaValue, setTextAreaValue] = useState<string>(text);

  return (
    <div
      className="absolute w-[350px] h-[120px] py-3 px-6 border-none border-[var(--primary)] flex justify-center items-center hover:border-2 group"
      style={{
        width: dimensions.width,
        height: dimensions.height,
        top: position.y,
        left: position.x,
        ...(!active ? { border: "none" } : {}),
      }}
    >
      <MoveHandle
        onMouseDown={handleMoveMouseDown}
        className={"group-hover:flex"}
      />
      {active && (
        <DeleteHandle
          onClick={() => {
            removeField(id);
          }}
        />
      )}
      <textarea
        className="w-full h-full text-display text-[var(--black)] resize-none outline-none overflow-hidden"
        placeholder={placeholder}
        onChange={(e) => {
          setTextAreaValue(e.currentTarget.value);
        }}
        value={textAreaValue}
      ></textarea>
      {active && <ResizeHandle onMouseDown={handleResizeMouseDown} />}
      {active && (
        <ColorsPalette className="absolute top-full left-0.25 translate-y-[7px]" />
      )}
    </div>
  );
};
