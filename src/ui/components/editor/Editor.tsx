import { FC, memo } from "react";
import { ActionButtonsField } from "./ActionButtonsField";
import { EditorUpperField } from "./EditorUpperField";
import { AddContentInfofield } from "./AddContentInfofield";
import { Button } from "../../atoms/Button";
import { Divider } from "../../atoms/Divider";

export type EditorProps = {
  onExportToPng: () => void;
};

export const Editor: FC<EditorProps> = memo(({ onExportToPng }) => {
  return (
    <div className="w-189.75 h-237 flex flex-col gap-8">
      <EditorUpperField />
      <Divider />
      <AddContentInfofield />
      <ActionButtonsField />
      <Divider />
      <div className="h-12 w-full flex items-center justify-end">
        <Button onClick={onExportToPng} className="w-43">
          Export to PNG
        </Button>
      </div>
    </div>
  );
});
