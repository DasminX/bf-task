import { FC, useContext } from "react";
import { ActionButton } from "../ui/molecules/ActionButton";
import { ToolsUpperField } from "./ToolsUpperField";
import { AppContext } from "../context/AppContext";

const DATA = [
  { type: "text", actionText: "Text", iconSource: "text.svg" },
  { type: "image", actionText: "Image", iconSource: "img.svg" },
  {
    type: "background",
    actionText: "Background",
    iconSource: "background.svg",
  },
];

export const Tools: FC = () => {
  const { addField, /* fields, */ isCreating, setIsCreating } =
    useContext(AppContext);

  return (
    <div className="w-[759px] h-[948px] flex flex-col gap-8">
      <ToolsUpperField />
      {/* Divider */}
      <div className="w-full h-0.5 bg-[var(--white98)]"></div>
      {/* Add content */}
      <div className="w-full h-[75px] bg-[var(--white97)] py-6 px-4 rounded-[10px]">
        <p className="text-body-bold">Add content</p>
      </div>
      <div className="flex flex-wrap gap-x-[29px] gap-y-8">
        {DATA.map((el) => {
          // console.log(fields);
          return (
            <ActionButton
              key={el.actionText}
              type={el.type as "text" | "image" | "background"}
              actionText={el.actionText}
              iconSource={el.iconSource}
              onClick={() => {
                switch (el.actionText) {
                  case "Image":
                  case "Background":
                    break;
                  case "Text":
                    addField({
                      id: Math.random().toString(),
                      type: "text",
                      text: "",
                      active: true,
                    });
                }
                if (!isCreating) {
                  setIsCreating(true);
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
