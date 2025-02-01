import { FC, MouseEventHandler } from "react";
import { Icon } from "./Icon";

export type MoveHandleProps = {
  onMouseDown: MouseEventHandler;
  className?: string;
};
export const MoveHandle: FC<MoveHandleProps> = ({
  onMouseDown,
  className = "",
}) => {
  return (
    <div
      className={`hidden absolute top-0 left-0 translate-[-50%] justify-center items-center w-10 h-10 rounded-full bg-[var(--white)] cursor-pointer ${className}`}
      onMouseDown={onMouseDown}
    >
      <Icon className="w-8 h-8" iconSource="move.svg" />
    </div>
  );
};
