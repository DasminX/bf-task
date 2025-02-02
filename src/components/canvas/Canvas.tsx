import {
  forwardRef,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { Img } from "../../ui/organisms/Img";
import { TextArea } from "../../ui/organisms/TextArea";
import { AppContext } from "../../context/AppContext";
import { cn } from "../../functions/cn";

export const Canvas = forwardRef<HTMLDivElement>((_, ref) => {
  const { isCreating, fields, background, changeActive } =
    useContext(AppContext);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      changeActive();
    },
    [changeActive]
  );

  const outletMemo: ReactNode = useMemo(() => {
    if (isCreating) {
      return (
        <>
          {fields.map((field) => {
            switch (field.type) {
              case "image":
                return (
                  <Img
                    key={field.id}
                    field={field}
                    parentRef={ref as RefObject<HTMLElement>}
                  />
                );
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

  // Memoize the inline style for the background image.
  const canvasStyle = useMemo(() => {
    return background ? { backgroundImage: `url(${background})` } : {};
  }, [background]);

  // Optionally, memoize the computed className if background changes.
  const canvasClassName = useMemo(() => {
    return cn(
      "relative w-189.75 h-237 bg-[var(--black50)] flex justify-center items-center",
      background && `bg-[url(${background})] bg-cover bg-center bg-no-repeat`
    );
  }, [background]);

  return (
    <div
      ref={ref}
      className={canvasClassName}
      onClick={handleClick}
      style={canvasStyle}
    >
      {outletMemo}
    </div>
  );
});
