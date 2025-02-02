import { Icon } from "../../ui/atoms/Icon";

export const WarningInfoArea = () => {
  return (
    <div className="flex flex-col items-center">
      <Icon iconSource="alert.svg" className="w-[290px] h-[290px]" />
      <div className="text-center">
        <p className="text-display text-[var(--black)]">WARNING</p>
        <p className="text-body-medium text-[var(--black75)]">
          You’re about to reset whole process. Are you sure you want to do it?
        </p>
      </div>
    </div>
  );
};
