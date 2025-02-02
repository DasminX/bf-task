import { FC } from "react";
import { ActionButton } from "../ui/molecules/ActionButton";
import { ToolsUpperField } from "./ToolsUpperField";
import { Button } from "../ui/atoms/Button";

const DATA = [
  { type: "text", actionText: "Text", iconSource: "text.svg" },
  { type: "image", actionText: "Image", iconSource: "img.svg" },
  {
    type: "background",
    actionText: "Background",
    iconSource: "background.svg",
  },
];

export type ToolsProps = {
  onExportToPng: () => void;
};

export const Tools: FC<ToolsProps> = ({ onExportToPng }) => {
  return (
    <div className="w-[759px] h-[948px] flex flex-col gap-8">
      <ToolsUpperField />
      {/* Divider */}
      <div className="w-full h-0.5 bg-[var(--white98)]"></div>
      {/* Add content */}
      <div className="w-full h-[75px] bg-[var(--white97)] py-6 px-4 rounded-[10px]">
        <p className="text-body-bold text-[var(--black)]">Add content</p>
      </div>
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
      <div className="w-full h-0.5 bg-[var(--white98)]"></div>

      <div className="h-12 w-full flex items-center justify-end">
        <Button onClick={onExportToPng} className="w-[172px]">
          Export to PNG
        </Button>
      </div>
    </div>
  );
};
