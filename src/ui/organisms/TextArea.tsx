import { FC } from "react";

export type TextAreaProps = {
  text: string;
  placeholder: string;
};

/* TODO */
export const TextArea: FC<TextAreaProps> = ({ text, placeholder }) => {
  return (
    <div className="w-[350px] h-[120px] py-3 px-6 border-2 border-[var(--primary)] flex justify-center items-center">
      <textarea
        className="w-full h-full text-display text-[var(--black)]"
        placeholder={placeholder}
      >
        {text}
      </textarea>
    </div>
  );
};
