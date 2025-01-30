import { FC } from "react";

// 18, 32, 64, 128
export type IconProps = {
  iconSource: string;
  size: number;
  className?: string;
};

export const Icon: FC<IconProps> = ({ iconSource, size, className }) => {
  return (
    <img
      className={`${className} w-[${size}px] aspect-square`}
      src={iconSource}
    />
  );
};
