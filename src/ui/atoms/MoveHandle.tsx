import { FC, memo, MouseEventHandler } from "react";
import { Icon } from "./Icon";

export type MoveHandleProps = {
  onMouseDown: MouseEventHandler;
};
export const MoveHandle: FC<MoveHandleProps> = memo(({ onMouseDown }) => {
  return (
    <div
      className={`absolute top-0 left-0 translate-[-50%] flex justify-center items-center w-10 h-10 rounded-full bg-[var(--white)] cursor-pointer`}
      onMouseDown={onMouseDown}
    >
      <Icon className="w-8 h-8" iconSource="move.svg" />
    </div>
  );
});
