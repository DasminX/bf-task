import { ChangeEventHandler, FC, memo, MouseEventHandler, RefObject, useCallback, useContext, useState } from "react";
import { ColorsPalette } from "../molecules/ColorsPalette";
import { MoveHandle } from "../atoms/MoveHandle";
import { DeleteHandle } from "../atoms/DeleteHandle";
import { ResizeHandle } from "../atoms/ResizeHandle";
import { useMoveResizer } from "../../hooks/use-move-resizer";
import { AppContext } from "../../context/AppContextProvider";
import { TextFieldType } from "../../utils/types";

export type TextAreaProps = {
  field: TextFieldType;
  parentRef: RefObject<HTMLElement>;
  placeholder: string;
};

export const TextArea: FC<TextAreaProps> = memo(({ field, parentRef, placeholder }) => {
  const { removeField, changeActiveField } = useContext(AppContext);

  const { position, dimensions, handleMoveMouseDown, handleResizeMouseDown } = useMoveResizer({
    // For different screen sizes it takes proportional top/left as in Figma design
    initialPosition: {
      x: (parentRef.current?.offsetWidth || 759) * 0.3017127799736495,
      y: (parentRef.current?.offsetHeight || 948) * 0.470464135021097,
    },
    initialSize: { width: 350, height: 120 },
    minSize: { width: 100, height: 75 },
    parentRef,
  });

  const [textAreaValue, setTextAreaValue] = useState<string>(field.text);

  const onTextAreaClickHandler = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      changeActiveField(field.id);
    },
    [changeActiveField],
  );

  const onDeleteHandler = useCallback<MouseEventHandler>(() => {
    removeField(field.id);
  }, [removeField]);

  const onTextAreaValueChangeHandler = useCallback<ChangeEventHandler<HTMLTextAreaElement>>((e) => {
    setTextAreaValue(e.currentTarget.value);
  }, []);

  return (
    <div
      className="field absolute w-87.5 h-30 py-3 px-6 border-2 border-[var(--primary)] flex justify-center items-center box-border"
      onClick={onTextAreaClickHandler}
      data-id={field.id}
      data-active={field.active}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        top: position.y,
        left: position.x,
        ...(!field.active && { border: "none" }),
        ...(field.active && { zIndex: 10 }),
      }}>
      <textarea
        spellCheck={false}
        className="w-full h-full text-display text-center resize-none outline-none overflow-hidden placeholder:text-[var(--black)] placeholder:opacity-25"
        placeholder={placeholder}
        style={{
          color: `var(--${field.selectedColor})`,
        }}
        onChange={onTextAreaValueChangeHandler}
        value={textAreaValue}></textarea>

      {field.active && (
        <>
          <MoveHandle onMouseDown={handleMoveMouseDown} />
          <DeleteHandle onClick={onDeleteHandler} />
          <ResizeHandle onMouseDown={handleResizeMouseDown} />
          <ColorsPalette
            fieldId={field.id}
            className="absolute top-full left-0.25 translate-y-1.75 flex justify-stretch gap-1"
            selectedColor={field.selectedColor}
          />
        </>
      )}
    </div>
  );
});
