import { FC } from "react";
import { Icon } from "../atoms/Icon";

export type ActionButtonProps = {
  iconSource: string;
  actionText: string;
  onClick: () => void;
};
export const ActionButton: FC<ActionButtonProps> = ({
  iconSource,
  actionText,
  onClick,
}) => {
  return (
    <div
      className="bg-[var(--white97)] rounded-[10px] p-3 w-[365px] h-64 flex flex-col justify-center items-center box-border duration-[250] ease-in-out border-none outline-none hover:bg-[var(--black25)] focus:bg-[var(--white97)] focus:outline-4 focus:outline-[var(--primary50)] disabled:opacity-25"
      onClick={onClick}
    >
      <Icon
        className="mb-auto fill-[var(--black75)] stroke-[var(--black75)]"
        iconSource={iconSource}
        size={128}
      />
      <p className="text-body-medium text-[var(--black)] mt-auto text-center">
        {actionText}
      </p>
    </div>
  );
};
