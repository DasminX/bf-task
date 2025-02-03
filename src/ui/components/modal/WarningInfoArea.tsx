import { FC } from "react";
import { Icon } from "../../atoms/Icon";

// Could memo but I think it would be unnecessary
export const WarningInfoArea: FC = () => {
  return (
    <div className="flex flex-col items-center h-100">
      <Icon src="alert.svg" className="w-72.5 h-72.5" />
      <div className="text-center h-27.5">
        <p className="text-display text-[var(--black)]">WARNING</p>
        <p className="text-body-medium text-[var(--black75)]">
          You’re about to reset whole process. Are you sure you want to do it?
        </p>
      </div>
    </div>
  );
};
