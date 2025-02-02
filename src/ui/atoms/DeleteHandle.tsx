import { FC, memo, MouseEventHandler } from "react";
import { Icon } from "./Icon";

export type DeleteHandleProps = {
  onClick: MouseEventHandler;
};
export const DeleteHandle: FC<DeleteHandleProps> = memo(({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className={
        "absolute top-0 left-full translate-[-50%] flex justify-center items-center w-6 h-6 rounded-full bg-[var(--white)] cursor-pointer"
      }
    >
      <Icon className="w-4.5 h-4.5" src="delete.svg" />
    </button>
  );
});
