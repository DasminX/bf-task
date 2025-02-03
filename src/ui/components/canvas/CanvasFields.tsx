import { FC, ForwardedRef, memo, RefObject, useContext, useMemo } from "react";
import { AppContext } from "../../../context/AppContextProvider";
import { Img } from "../../organisms/Img";
import { TextArea } from "../../organisms/TextArea";

export type CanvasFieldsProps = {
  parentRef: ForwardedRef<HTMLDivElement>;
};
export const CanvasFields: FC<CanvasFieldsProps> = memo(({ parentRef }) => {
  const { fields } = useContext(AppContext);

  const memoizedFields = useMemo(() => fields, [fields]);

  return (
    <>
      {memoizedFields.map((field) => {
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
});
