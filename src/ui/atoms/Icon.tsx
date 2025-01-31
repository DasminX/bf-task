import { FC } from "react";

// 18, 32, 64, 128
export type IconProps = {
  iconSource: string;
  className?: string;
};

export const Icon: FC<IconProps> = ({ iconSource, className = "" }) => {
  return <img className={className} src={iconSource} />;
};
