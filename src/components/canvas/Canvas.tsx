import { forwardRef, MouseEvent, ReactNode, RefObject, useCallback, useContext, useMemo } from "react";
import { Img } from "../../ui/organisms/Img";
import { TextArea } from "../../ui/organisms/TextArea";
import { cn } from "../../functions/cn";
import { AppContext } from "../../context/AppContextProvider";

export const Canvas = forwardRef<HTMLDivElement>((_, ref) => {
  const { isCreating, fields, background, changeActive } = useContext(AppContext);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      changeActive();
    },
    [changeActive],
  );

  const memoizedOutlet: ReactNode = useMemo(() => {
    if (isCreating) {
      return (
        <>
          {fields.map((field) => {
            switch (field.type) {
              case "image":
                return <Img key={field.id} field={field} parentRef={ref as RefObject<HTMLElement>} />;
              case "text":
                return (
                  <TextArea
                    key={field.id}
                    field={field}
                    parentRef={ref as RefObject<HTMLElement>}
                    placeholder="Type your text here"
                  />
                );
              default:
                return null;
            }
          })}
        </>
      );
    }
    return <img src="startImage.png" className="w-full h-full" alt="Start" />;
  }, [isCreating, fields, ref]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-189.75 h-237 bg-[var(--black50)] flex justify-center items-center",
        background && "bg-cover bg-center bg-no-repeat",
      )}
      onClick={handleClick}
      style={{
        ...(background && { backgroundImage: `url(${background})` }),
      }}>
      {memoizedOutlet}
    </div>
  );
});
