import { FC, useContext } from "react";
import { ResizeHandle } from "../atoms/ResizeHandle";
import { MoveHandle } from "../atoms/MoveHandle";
import { DeleteHandle } from "../atoms/DeleteHandle";
import { useMoveResizer } from "../../hooks/use-move-resizer";
import { AppContext, FieldType } from "../../context/AppContext";

export type ImgProps = {
  id: FieldType["id"];
  parentRef: React.RefObject<HTMLElement>;
  imgSource: string;
};

export const Img: FC<ImgProps> = ({ id, parentRef, imgSource }) => {
  const { removeField } = useContext(AppContext);
  const { position, dimensions, handleMoveMouseDown, handleResizeMouseDown } =
    useMoveResizer({
      initialPosition: { x: 280, y: 366 },
      initialSize: { height: 200, width: 200 },
      minSize: 100,
      parentRef,
    });

  return (
    <div
      className={`absolute border-2 border-[var(--primary)] flex justify-center items-center`}
      style={{
        left: position.x,
        top: position.y,
        width: dimensions.width,
        height: dimensions.height,
      }}
    >
      <MoveHandle onMouseDown={handleMoveMouseDown} />
      <DeleteHandle
        onClick={() => {
          removeField(id);
        }}
      />

      <img src={imgSource} className="object-cover w-full h-full" />

      <ResizeHandle onMouseDown={handleResizeMouseDown} />
    </div>
  );
};
