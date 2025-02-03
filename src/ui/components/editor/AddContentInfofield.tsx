import { FC } from "react";

// Could memo but I think it would be unnecessary
export const AddContentInfofield: FC = () => {
  return (
    <div className="w-full h-18.75 bg-[var(--white97)] py-6 px-4 rounded-[10px]">
      <p className="text-body-bold text-[var(--black)]">Add content</p>
    </div>
  );
};
