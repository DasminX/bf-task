import { FC, useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import { Icon } from "../../ui/atoms/Icon";
import { WarningInfoArea } from "./WarningInfoArea";
import { Button } from "../../ui/atoms/Button";
import { AppContext } from "../../context/AppContextProvider";

export const WarningModal: FC = () => {
  const { setIsModal, removeFields, resetBackground, setIsCreating } = useContext(AppContext);

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
        <button
          className="absolute top-8 right-8 cursor-pointer select-none"
          onClick={() => {
            setIsModal(false);
          }}>
          <Icon src="close.svg" className="w-8 h-8" />
        </button>
        <WarningInfoArea />
        <div className="h-10 w-96.75 gap-8 flex items-center justify-center">
          <p
            className="text-body-medium cursor-pointer"
            onClick={() => {
              setIsModal(false);
            }}>
            Cancel
          </p>
          <Button
            onClick={() => {
              removeFields();
              resetBackground();
              setIsCreating(false);
              setIsModal(false);
            }}>
            Reset
          </Button>
        </div>
      </div>
    </div>,
    el,
  );
};
