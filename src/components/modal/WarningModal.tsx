import { FC, useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import { Icon } from "../../ui/atoms/Icon";
import { WarningInfoArea } from "./WarningInfoArea";
import { AppContext } from "../../context/AppContextProvider";
import { WarningButtons } from "./WarningButtons";

export const WarningModal: FC = () => {
  const { setIsModal } = useContext(AppContext);

  const el = document.createElement("div");

  useEffect(() => {
    const modalRoot = document.getElementById("modal-root");
    if (modalRoot) {
      modalRoot.appendChild(el);
    }

    return () => {
      if (modalRoot) {
        modalRoot.removeChild(el);
      }
    };
  }, [el]);

  return createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-[#67676788] z-100">
      <div className="relative flex flex-col items-center justify-between gap-12 py-12 px-32 bg-[var(--white)] w-160.75 h-146 z-101">
        {/* Close X button */}
        <button
          className="absolute top-8 right-8 cursor-pointer select-none"
          onClick={() => {
            setIsModal(false);
          }}>
          <Icon src="close.svg" className="w-8 h-8" />
        </button>
        <WarningInfoArea />
        <WarningButtons />
      </div>
    </div>,
    el,
  );
};
