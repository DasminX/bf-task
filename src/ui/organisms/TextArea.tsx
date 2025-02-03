import { FC, memo, useContext, useState } from "react";
import { ColorsPalette } from "../molecules/ColorsPalette";
import { MoveHandle } from "../atoms/MoveHandle";
import { DeleteHandle } from "../atoms/DeleteHandle";
import { ResizeHandle } from "../atoms/ResizeHandle";
import { useMoveResizer } from "../../hooks/use-move-resizer";
import { AppContext, FieldType } from "../../context/AppContextProvider";

export type TextAreaProps = {
  field: Extract<FieldType, { type: "text" }>;
  parentRef: React.RefObject<HTMLElement>;
  placeholder: string;
};

export const TextArea: FC<TextAreaProps> = memo(
  ({ field, parentRef, placeholder }) => {
    // TODO WYciagnac do gory
    const { removeField, changeActive } = useContext(AppContext);

    const { position, dimensions, handleMoveMouseDown, handleResizeMouseDown } =
      useMoveResizer({
        initialPosition: { x: 229, y: 446 },
        initialSize: { width: 350, height: 120 },
        minSize: 100,
        parentRef,
      });

    const [textAreaValue, setTextAreaValue] = useState<string>(field.text);

    return (
      <div
        className="absolute w-87.5 h-30 py-3 px-6 border-2 border-[var(--primary)] flex justify-center items-center box-border"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          changeActive(field.id);
        }}
        style={{
          width: dimensions.width,
          height: dimensions.height,
          top: position.y,
          left: position.x,
          ...(!field.active && { border: "none" }),
          ...(field.active && { zIndex: 10 }),
        }}
      >
        {field.active && <MoveHandle onMouseDown={handleMoveMouseDown} />}
        {field.active && (
          <DeleteHandle
            onClick={() => {
              removeField(field.id);
            }}
          />
        )}
        <textarea
          spellCheck={false}
          className="w-full h-full text-display text-center resize-none outline-none overflow-hidden placeholder:text-[var(--black)] placeholder:opacity-25"
          placeholder={placeholder}
          style={{
            color: `var(--${field.selectedColor})`,
          }}
          onChange={(e) => {
            setTextAreaValue(e.currentTarget.value);
          }}
          value={textAreaValue}
        ></textarea>
        {field.active && <ResizeHandle onMouseDown={handleResizeMouseDown} />}
        {field.active && (
          <ColorsPalette
            fieldId={field.id}
            className="absolute top-full left-0.25 translate-y-1.75"
            selectedColor={field.selectedColor}
          />
        )}
      </div>
    );
  }
);
