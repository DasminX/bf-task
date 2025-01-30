export type FieldProps = {
  isCreating: boolean;
};
export const Field = ({ isCreating }: FieldProps) => {
  return (
    <div className="w-[759px] h-[948px] bg-slate-300">
      {!isCreating && <img src="startImage.png" className="w-full h-full" />}
    </div>
  );
};
