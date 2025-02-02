import { FC, memo } from "react";
import { cn } from "../../functions/cn";

export type IconProps = {
  src: string;
  className?: string;
};

export const Icon: FC<IconProps> = memo(({ src, className = "" }) => {
  return <img className={cn(className, "select-none")} src={src} />;
});
