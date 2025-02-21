import { forwardRef, memo, MouseEventHandler, ReactNode, useCallback, useContext } from "react";
import { CanvasFields } from "./CanvasFields";
import { AppContext } from "../../../context/AppContextProvider";
import { cn } from "../../../functions/cn";

export const Canvas = memo(
  forwardRef<HTMLDivElement>((_, ref) => {
    const { isCreating, background, changeActiveField } = useContext(AppContext);

    const Outlet: ReactNode = isCreating ? (
      <CanvasFields parentRef={ref} />
    ) : (
      <img src="startImage.png" className="w-full h-full" alt="Start" />
    );

    const onClickHandler = useCallback<MouseEventHandler<HTMLDivElement>>(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        changeActiveField();
      },
      [changeActiveField],
    );

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-189.75 h-237 bg-[var(--black50)] flex justify-center items-center overflow-hidden",
          background && "bg-cover bg-center bg-no-repeat",
        )}
        onClick={onClickHandler}
        style={{
          ...(background && { backgroundImage: `url(${background})` }),
        }}>
        {Outlet}
      </div>
    );
  }),
);
