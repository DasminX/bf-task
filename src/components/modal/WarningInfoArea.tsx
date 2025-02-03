import { FC } from "react";
import { Icon } from "../../ui/atoms/Icon";

export const WarningInfoArea: FC = () => {
  return (
    <div className="flex flex-col items-center">
      <Icon src="alert.svg" className="w-72.5 h-72.5" />
      <div className="text-center">
        <p className="text-display text-[var(--black)]">WARNING</p>
        <p className="text-body-medium text-[var(--black75)]">
          You’re about to reset whole process. Are you sure you want to do it?
        </p>
      </div>
    </div>
  );
};
