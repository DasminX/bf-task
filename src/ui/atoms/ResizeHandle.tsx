import { FC, memo, MouseEventHandler } from "react";

export type ResizeHandleProps = {
  onMouseDown: MouseEventHandler;
};
export const ResizeHandle: FC<ResizeHandleProps> = memo(({ onMouseDown }) => {
  return (
    <div
      className="absolute bottom-0 right-0 translate-[50%] w-5 h-5 bg-[var(--primary)] cursor-se-resize rounded-full border-4 border-[var(--white)] select-none"
      onMouseDown={onMouseDown}
    ></div>
  );
});
