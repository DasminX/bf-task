import { FC } from "react";
import { cn } from "../../functions/cn";

// 18, 32, 64, 128
export type IconProps = {
  iconSource: string;
  className?: string;
};

export const Icon: FC<IconProps> = ({ iconSource, className = "" }) => {
  return <img className={cn(className, "select-none")} src={iconSource} />;
};
