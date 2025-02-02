import {
  ActionButton,
  ActionButtonProps,
} from "../../ui/molecules/ActionButton";

const ACTION_BUTTONS: ActionButtonProps[] = [
  { type: "text", actionText: "Text", iconSource: "text.svg" },
  { type: "image", actionText: "Image", iconSource: "img.svg" },
  {
    type: "background",
    actionText: "Background",
    iconSource: "background.svg",
  },
];

export const ActionButtonsField = () => {
  return (
    <div className="flex flex-wrap gap-x-7.25 gap-y-8 mb-16.25">
      {ACTION_BUTTONS.map((actionButton) => {
        return <ActionButton key={actionButton.actionText} {...actionButton} />;
      })}
    </div>
  );
};
