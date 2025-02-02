import { FC } from "react";
import { Button } from "../../ui/atoms/Button";
import { ActionButtonsField } from "./ActionButtonsField";
import { Divider } from "../../ui/atoms/Divider";
import { EditorUpperField } from "./EditorUpperField";

export type EditorProps = {
  onExportToPng: () => void;
};

export const Editor: FC<EditorProps> = ({ onExportToPng }) => {
  return (
    <div className="w-[759px] h-[948px] flex flex-col gap-8">
      <EditorUpperField />
      {/* Divider */}
      <Divider />
      {/* Add content */}
      <div className="w-full h-[75px] bg-[var(--white97)] py-6 px-4 rounded-[10px]">
        <p className="text-body-bold text-[var(--black)]">Add content</p>
      </div>
      <ActionButtonsField />
      <Divider />

      <div className="h-12 w-full flex items-center justify-end">
        <Button onClick={onExportToPng} className="w-[172px]">
          Export to PNG
        </Button>
      </div>
    </div>
  );
};
