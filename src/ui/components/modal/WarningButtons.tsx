import { FC, memo, MouseEventHandler, useCallback, useContext } from "react";
import { AppContext } from "../../../context/AppContextProvider";
import { Button } from "../../atoms/Button";

export const WarningButtons: FC = memo(() => {
  const { setIsModal, removeAllFields, resetBackground, setIsCreating } = useContext(AppContext);

  const onCancelHandler = useCallback<MouseEventHandler<HTMLParagraphElement>>(() => {
    setIsModal(false);
  }, [setIsModal]);

  const onResetHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    removeAllFields();
    resetBackground();
    setIsCreating(false);
    setIsModal(false);
  }, [removeAllFields, resetBackground, setIsCreating, setIsModal]);

  return (
    <div className="h-10 w-96.75 gap-8 flex items-center justify-center">
      <p className="text-body-medium cursor-pointer text-[var(--black)]" onClick={onCancelHandler}>
        Cancel
      </p>
      <Button onClick={onResetHandler}>Reset</Button>
    </div>
  );
});
