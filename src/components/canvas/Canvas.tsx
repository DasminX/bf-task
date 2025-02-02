import { forwardRef, ReactNode, RefObject, useContext } from "react";
import { Img } from "../../ui/organisms/Img";
import { TextArea } from "../../ui/organisms/TextArea";
import { AppContext } from "../../context/AppContext";
import { cn } from "../../functions/cn";

export const Canvas = forwardRef<HTMLDivElement>((_, ref) => {
  const { isCreating, fields, background, changeActive } =
    useContext(AppContext);

  let Outlet: ReactNode;

  if (isCreating) {
    Outlet = (
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
  } else {
    Outlet = <img src="startImage.png" className="w-full h-full" alt="Start" />;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-[759px] h-[948px] bg-[var(--black50)] flex justify-center items-center",
        background && `bg-[url(${background})] bg-cover bg-center bg-no-repeat`
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        changeActive();
      }}
      style={{
        ...(background && { backgroundImage: `url(${background})` }),
      }}
    >
      {Outlet}
    </div>
  );
});
