import { FC, ForwardedRef, RefObject, useContext } from "react";
import { AppContext } from "../../../context/AppContextProvider";
import { Img } from "../../organisms/Img";
import { TextArea } from "../../organisms/TextArea";

export type CanvasFieldsProps = {
  parentRef: ForwardedRef<HTMLDivElement>;
};
export const CanvasFields: FC<CanvasFieldsProps> = ({ parentRef }) => {
  const { fields } = useContext(AppContext);

  return (
    <>
      {fields.map((field) => {
        switch (field.type) {
          case "image":
            return <Img key={field.id} field={field} parentRef={parentRef as RefObject<HTMLDivElement>} />;
          case "text":
            return (
              <TextArea
                key={field.id}
                field={field}
                parentRef={parentRef as RefObject<HTMLDivElement>}
                placeholder="Type your text here"
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
};
