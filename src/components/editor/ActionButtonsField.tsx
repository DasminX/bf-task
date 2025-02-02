import { ActionButton } from "../../ui/molecules/ActionButton";

const DATA = [
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
    <div className="flex flex-wrap gap-x-7.25 gap-y-8 mb-[65px]">
      {DATA.map((el) => {
        return (
          <ActionButton
            key={el.actionText}
            type={el.type as "text" | "image" | "background"}
            actionText={el.actionText}
            iconSource={el.iconSource}
          />
        );
      })}
    </div>
  );
};
