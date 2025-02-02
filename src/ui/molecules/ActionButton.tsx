import { FC, useContext } from "react";
import { Icon } from "../atoms/Icon";
import { AppContext } from "../../context/AppContext";

export type ActionButtonProps = {
  type: "image" | "text" | "background";
  iconSource: string;
  actionText: string;
};
export const ActionButton: FC<ActionButtonProps> = ({
  type,
  iconSource,
  actionText,
}) => {
  const { addField, setBackground, isCreating, setIsCreating } =
    useContext(AppContext);

  return (
    <button className="relative flex flex-col justify-between items-center bg-[var(--white97)] rounded-[10px] p-3 w-1/2 max-w-[365px] h-64 duration-[250ms] ease-in-out border-none cursor-pointer hover:bg-[var(--black25)] focus:bg-[var(--white97)] focus:outline-4 focus:outline-[var(--primary50)] disabled:opacity-25 disabled:cursor-not-allowed">
      <input
        type={type === "text" ? "button" : "file"}
        accept="image/*"
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        onChange={(e) => {
          if (type === "text") return;
          const file = e.target.files?.[0];
          if (!file) return;

          const imgSource = URL.createObjectURL(file);

          if (type === "image") {
            addField({
              id: Math.random().toString(),
              type: "image",
              imgSource: imgSource,
            });
          } else {
            setBackground(imgSource);
          }

          if (!isCreating) {
            setIsCreating(true);
          }
        }}
        onClick={() => {
          if (type !== "text") return;
          addField({
            id: Math.random().toString(),
            type: "text",
            text: "",
            selectedColor: "black",
          });

          if (!isCreating) {
            setIsCreating(true);
          }
        }}
      />

      {/* Empty character for centering Icon purposes */}
      <p className="text-body-medium text-[rgba(0,0,0,0)]">&#8192;</p>
      <div className="grow-1 flex justify-center items-center">
        <Icon className="w-32 h-32" iconSource={iconSource} />
      </div>
      <p className="text-body-medium text-[var(--black)]">{actionText}</p>
    </button>
  );
};
