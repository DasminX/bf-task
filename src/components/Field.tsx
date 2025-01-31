import { useRef } from "react";
import { Img } from "../ui/organisms/Img";

export type FieldProps = {
  isCreating: boolean;
};
export const Field = ({ isCreating }: FieldProps) => {
  const fieldRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={fieldRef}
      className="w-[759px] h-[948px] bg-slate-300 flex justify-center items-center"
    >
      {/* {!isCreating && <img src="startImage.png" className="w-full h-full" />} */}
      <Img parentRef={fieldRef} />
    </div>
  );
};
