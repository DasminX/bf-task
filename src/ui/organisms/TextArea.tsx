import { FC } from "react";
import { Icon } from "../atoms/Icon";
import { ColorsPalette } from "../molecules/ColorsPalette";

export type TextAreaProps = {
  text: string;
  placeholder: string;
};

/* TODO */
export const TextArea: FC<TextAreaProps> = ({ text, placeholder }) => {
  return (
    <div className="relative w-[350px] h-[120px] py-3 px-6 border-2 border-[var(--primary)] flex justify-center items-center">
      <div className="absolute top-0 left-0 translate-[-50%] flex justify-center items-center w-10 h-10 rounded-full bg-[var(--white)] cursor-pointer">
        <Icon className="w-8 h-8" iconSource="move.svg" />
      </div>
      <div className="absolute top-0 left-full translate-[-50%] flex justify-center items-center w-6 h-6 rounded-full bg-[var(--white)] cursor-pointer">
        <Icon className="w-4.5 h-4.5" iconSource="delete.svg" />
      </div>
      <textarea
        className="w-full h-full text-display text-[var(--black)]"
        placeholder={placeholder}
      >
        {text}
      </textarea>
      <div className="absolute top-full left-full translate-[-50%] w-5 h-5 bg-[var(--primary)] cursor-pointer rounded-full border-4 border-[var(--white)]"></div>
      <ColorsPalette className="absolute top-full left-0.25 translate-y-[7px]" />
    </div>
  );
};
