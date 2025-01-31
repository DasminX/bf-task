import { FC } from "react";
import { Icon } from "../atoms/Icon";

export type ImgProps = {};

/* TODO */
export const Img: FC<ImgProps> = () => {
  return (
    <div className="relative w-50 h-50 py-3 px-6 border-2 border-[var(--primary)] flex justify-center items-center">
      <div className="absolute top-0 left-0 translate-[-50%] flex justify-center items-center w-10 h-10 rounded-full bg-[var(--white)] cursor-pointer">
        <Icon className="w-8 h-8" iconSource="move.svg" />
      </div>
      <div className="absolute top-0 left-full translate-[-50%] flex justify-center items-center w-6 h-6 rounded-full bg-[var(--white)] cursor-pointer">
        <Icon className="w-4.5 h-4.5" iconSource="delete.svg" />
      </div>
      <img src="" />
      <div className="absolute top-full left-full translate-[-50%] w-5 h-5 bg-[var(--primary)] cursor-pointer rounded-full border-4 border-[var(--white)]"></div>
    </div>
  );
};
