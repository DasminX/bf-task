import { forwardRef, ReactNode, RefObject, useContext } from "react";
import { Img } from "../../ui/organisms/Img";
import { TextArea } from "../../ui/organisms/TextArea";
import { AppContext } from "../../context/AppContext";

export const Canvas = forwardRef<HTMLDivElement>((_, ref) => {
  const { isCreating, fields, background } = useContext(AppContext);

  let Outlet: ReactNode;

  if (isCreating) {
    Outlet = (
      <>
        {fields.map((field) => {
          switch (field.type) {
            case "image":
              return (
                <Img
                  id={field.id}
                  key={field.id}
                  parentRef={ref as RefObject<HTMLElement>}
                  imgSource={field.imgSource}
                />
              );
            case "text":
              return (
                <TextArea
                  id={field.id}
                  key={field.id}
                  selectedColor={field.selectedColor}
                  parentRef={ref as RefObject<HTMLElement>}
                  placeholder="Type your text here"
                  text={field.text || ""}
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
      className="relative w-[759px] h-[948px] bg-[var(--black50)] flex justify-center items-center"
      style={
        background
          ? {
              backgroundImage: `url(${background})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
            }
          : {}
      }
    >
      {Outlet}
    </div>
  );
});
