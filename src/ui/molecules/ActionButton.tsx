import { ChangeEventHandler, FC, memo, MouseEventHandler, useCallback, useContext, useRef } from "react";
import { Icon } from "../atoms/Icon";
import { AppContext } from "../../context/AppContextProvider";

export type ActionButtonProps = {
  type: "image" | "text" | "background";
  src: string;
  actionText: string;
};
export const ActionButton: FC<ActionButtonProps> = memo(({ type, src, actionText }) => {
  const { isCreating, addField, setBackground, setIsCreating } = useContext(AppContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeHandler = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const imgSource = URL.createObjectURL(file);

      type === "background"
        ? setBackground(imgSource)
        : addField({
            id: Math.random().toString(),
            type: "image",
            imgSource: imgSource,
            active: true,
          });

      if (!isCreating) setIsCreating(true);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [type, isCreating, setIsCreating, inputRef],
  );

  const onClickHandler = useCallback<MouseEventHandler<HTMLInputElement>>(() => {
    switch (type) {
      case "text":
        addField({
          id: Math.random().toString(),
          type: "text",
          text: "",
          selectedColor: "black",
          active: true,
        });
        break;
    }

    if (!isCreating) setIsCreating(true);
  }, [type, isCreating, setIsCreating]);

  return (
    <button className="relative flex flex-col justify-between items-center bg-[var(--white97)] rounded-[10px] p-3 w-91.25 h-64 duration-[250ms] ease-in-out border-none cursor-pointer hover:bg-[var(--black25)] focus:bg-[var(--white97)] focus:outline-4 focus:outline-[var(--primary50)] disabled:opacity-25 disabled:cursor-not-allowed">
      <input
        ref={inputRef}
        type={type === "text" ? "button" : "file"}
        accept="image/*"
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        onChange={onChangeHandler}
        onClick={onClickHandler}
      />

      {/* Empty character for centering Icon purposes */}
      <p className="text-body-medium text-[var(--invisible)]">&#8192;</p>
      <div className="grow-1 flex justify-center items-center">
        <Icon className="w-32 h-32" src={src} />
      </div>
      <p className="text-body-medium text-[var(--black)]">{actionText}</p>
    </button>
  );
});
