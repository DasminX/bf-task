import { FC, memo, MouseEventHandler, useCallback, useContext } from "react";
import { ResizeHandle } from "../atoms/ResizeHandle";
import { MoveHandle } from "../atoms/MoveHandle";
import { DeleteHandle } from "../atoms/DeleteHandle";
import { useMoveResizer } from "../../hooks/use-move-resizer";
import { AppContext } from "../../context/AppContextProvider";
import { ImageFieldType } from "../../utils/types";

export type ImgProps = {
  field: ImageFieldType;
  parentRef: React.RefObject<HTMLElement>;
};

export const Img: FC<ImgProps> = memo(({ parentRef, field }) => {
  const { removeField, changeActiveField } = useContext(AppContext);

  const { position, dimensions, handleMoveMouseDown, handleResizeMouseDown } = useMoveResizer({
    initialPosition: { x: 280, y: 366 },
    initialSize: { height: 200, width: 200 },
    minSize: 100,
    parentRef,
  });

  const onImgClickHandler = useCallback<MouseEventHandler<HTMLDivElement>>(
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

  return (
    <div
      className={`absolute border-2 border-[var(--primary)] flex justify-center items-center box-border`}
      onClick={onImgClickHandler}
      style={{
        left: position.x,
        top: position.y,
        width: dimensions.width,
        height: dimensions.height,
        ...(!field.active && { border: "none" }),
        ...(field.active && { zIndex: 10 }),
      }}>
      {field.active && <MoveHandle onMouseDown={handleMoveMouseDown} />}
      {field.active && <DeleteHandle onClick={onDeleteHandler} />}

      <img src={field.imgSource} className="object-cover w-full h-full" />

      {field.active && <ResizeHandle onMouseDown={handleResizeMouseDown} />}
    </div>
  );
});
