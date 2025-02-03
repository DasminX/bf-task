import { FC, memo, useContext } from "react";
import { ResizeHandle } from "../atoms/ResizeHandle";
import { MoveHandle } from "../atoms/MoveHandle";
import { DeleteHandle } from "../atoms/DeleteHandle";
import { useMoveResizer } from "../../hooks/use-move-resizer";
import { AppContext, FieldType } from "../../context/AppContextProvider";

export type ImgProps = {
  field: Extract<FieldType, { type: "image" }>;
  parentRef: React.RefObject<HTMLElement>;
};

export const Img: FC<ImgProps> = memo(({ parentRef, field }) => {
  // TODO Wyciagnac do gory
  const { removeField, changeActive } = useContext(AppContext);
  const { position, dimensions, handleMoveMouseDown, handleResizeMouseDown } =
    useMoveResizer({
      initialPosition: { x: 280, y: 366 },
      initialSize: { height: 200, width: 200 },
      minSize: 100,
      parentRef,
    });

  return (
    <div
      className={`absolute border-2 border-[var(--primary)] flex justify-center items-center box-border`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        changeActive(field.id);
      }}
      style={{
        left: position.x,
        top: position.y,
        width: dimensions.width,
        height: dimensions.height,
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

      <img src={field.imgSource} className="object-cover w-full h-full" />

      {field.active && <ResizeHandle onMouseDown={handleResizeMouseDown} />}
    </div>
  );
});
