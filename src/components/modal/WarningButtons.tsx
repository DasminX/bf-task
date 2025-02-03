import { FC, useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";
import { Button } from "../../ui/atoms/Button";

export const WarningButtons: FC = () => {
  const { setIsModal, removeFields, resetBackground, setIsCreating } = useContext(AppContext);

  return (
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
  );
};
