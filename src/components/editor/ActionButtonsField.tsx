import { useMemo } from "react";
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

export const ActionButtonsField = () => {
  // Memoize the rendered action buttons to avoid unnecessary recalculations
  const actionButtonsNodes = useMemo(
    () => ACTION_BUTTONS.map((actionButton) => <ActionButton key={actionButton.actionText} {...actionButton} />),
    [], // Empty array since ACTION_BUTTONS is static
  );

  return <div className="flex flex-wrap gap-x-7.25 gap-y-8 mb-16.25">{actionButtonsNodes}</div>;
};
