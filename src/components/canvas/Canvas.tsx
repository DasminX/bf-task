import { forwardRef, memo, ReactNode, useContext } from "react";
import { cn } from "../../functions/cn";
import { AppContext } from "../../context/AppContextProvider";
import { CanvasFields } from "./CanvasFields";

export const Canvas = memo(
  forwardRef<HTMLDivElement>((_, ref) => {
    const { isCreating, background, changeActive } = useContext(AppContext);

    const Outlet: ReactNode = isCreating ? (
      <CanvasFields parentRef={ref} />
    ) : (
      <img src="startImage.png" className="w-full h-full" alt="Start" />
    );

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-189.75 h-237 bg-[var(--black50)] flex justify-center items-center overflow-hidden",
          background && "bg-cover bg-center bg-no-repeat",
        )}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          changeActive();
        }}
        style={{
          ...(background && { backgroundImage: `url(${background})` }),
        }}>
        {Outlet}
      </div>
    );
  }),
);
