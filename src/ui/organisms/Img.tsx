import { FC, memo, MouseEventHandler, RefObject, useCallback, useContext } from "react";
import { ResizeHandle } from "../atoms/ResizeHandle";
import { MoveHandle } from "../atoms/MoveHandle";
import { DeleteHandle } from "../atoms/DeleteHandle";
import { useMoveResizer } from "../../hooks/use-move-resizer";
import { AppContext } from "../../context/AppContextProvider";
import { ImageFieldType } from "../../utils/types";

export type ImgProps = {
  field: ImageFieldType;
  parentRef: RefObject<HTMLElement>;
};

export const Img: FC<ImgProps> = memo(({ parentRef, field }) => {
  const { removeField, changeActiveField } = useContext(AppContext);

  const { position, dimensions, handleMoveMouseDown, handleResizeMouseDown } = useMoveResizer({
    // For different screen sizes it takes proportional top/left as in Figma design
    initialPosition: {
      x: (parentRef.current?.offsetWidth || 759) * 0.3689064558629776,
      y: (parentRef.current?.offsetHeight || 948) * 0.3860759493670886,
    },
    initialSize: { height: 200, width: 200 },
    minSize: 50,
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
      className={`field absolute border-2 border-[var(--primary)] flex justify-center items-center box-border`}
      onClick={onImgClickHandler}
      data-id={field.id}
      data-active={field.active}
      style={{
        left: position.x,
        top: position.y,
        width: dimensions.width,
        height: dimensions.height,
        ...(!field.active && { border: "none" }),
        ...(field.active && { zIndex: 10 }),
      }}>
      <img src={field.imgSource} className="object-cover w-full h-full" />
      {field.active && (
        <>
          <MoveHandle onMouseDown={handleMoveMouseDown} />
          <DeleteHandle onClick={onDeleteHandler} />
          <ResizeHandle onMouseDown={handleResizeMouseDown} />
        </>
      )}
    </div>
  );
});
