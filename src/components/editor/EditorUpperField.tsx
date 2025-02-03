import { FC, useContext } from "react";
import { Icon } from "../../ui/atoms/Icon";
import { AppContext } from "../../context/AppContextProvider";

export const EditorUpperField: FC = () => {
  const { setIsModal } = useContext(AppContext);

  return (
    <div className="h-16 w-full flex justify-between items-center">
      {/* Logo and CanvasEditor */}
      <div className="h-full gap-3 flex justify-between items-center">
        <Icon src="logo.svg" className="w-16 h-16" />
        <p className="text-display text-[var(--black75)] w-55.75">CanvasEditor</p>
      </div>
      {/* Reset button */}
      <button
        className="w-22.5 h-8 flex justify-between items-center cursor-pointer border-b-1 border-[var(--red)]"
        onClick={() => {
          setIsModal(true);
        }}>
        <p className="w-12.5 text-body-medium text-[var(--red)]">Reset</p>
        <Icon src="reset.svg" className="w-8 h-8" />
      </button>
    </div>
  );
};
