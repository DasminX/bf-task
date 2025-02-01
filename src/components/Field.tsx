import { FC, ReactNode, useContext, useRef } from "react";
import { Img } from "../ui/organisms/Img";
import { TextArea } from "../ui/organisms/TextArea";
import { AppContext } from "../context/AppContext";

export const Field: FC = () => {
  const { isCreating, fields, background } = useContext(AppContext);
  const fieldRef = useRef<HTMLDivElement>(null);

  let Outlet: ReactNode;

  // useEffect(() => {
  //   fieldRef.current?.addEventListener("click", (e: MouseEvent) => {
  //     console.log(e.target);
  //     console.log(e.currentTarget);
  //   });
  // }, []);
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
                  parentRef={fieldRef}
                  imgSource={field.imgSource}
                  active={field.active}
                />
              );
            case "text":
              return (
                <TextArea
                  id={field.id}
                  key={field.id}
                  parentRef={fieldRef}
                  placeholder="Add text"
                  text={field.text || ""}
                  active={field.active}
                />
              );
            default:
              return <></>;
          }
        })}
      </>
    );
  } else {
    Outlet = <img src="startImage.png" className="w-full h-full" />;
  }

  return (
    <div
      ref={fieldRef}
      className="relative w-[759px] h-[948px] bg-[var(--black50)] flex justify-center items-center"
      style={
        background
          ? {
              backgroundImage: `url(${background})`, // Ensure the URL is wrapped in url(...)
              backgroundSize: "cover", // Adjust as needed (cover, contain, etc.)
              backgroundPosition: "center center", // Centers the image
              backgroundRepeat: "no-repeat",
            }
          : {}
      }
    >
      {Outlet}
    </div>
  );
};
