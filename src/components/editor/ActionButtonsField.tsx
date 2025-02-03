import { FC, useMemo } from "react";
import { ActionButton, ActionButtonProps } from "../../ui/molecules/ActionButton";

const ACTION_BUTTONS: ActionButtonProps[] = [
  { type: "text", actionText: "Text", src: "text.svg" },
  { type: "image", actionText: "Image", src: "img.svg" },
  {
    type: "background",
    actionText: "Background",
    src: "background.svg",
  },
];

export const ActionButtonsField: FC = () => {
  const memoizedActionButtons = useMemo(
    () => ACTION_BUTTONS.map((actionButton) => <ActionButton key={actionButton.actionText} {...actionButton} />),
    [],
  );

  return <div className="flex flex-wrap gap-x-7.25 gap-y-8 mb-16.25">{memoizedActionButtons}</div>;
};
