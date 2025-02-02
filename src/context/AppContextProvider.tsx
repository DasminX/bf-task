import { FC, ReactNode, useState } from "react";
import { AppContext, AppContextType, FieldType } from "./AppContext";

export type AppContextProviderProps = {
  children: ReactNode;
};
export const AppContextProvider: FC<AppContextProviderProps> = ({
  children,
}) => {
  const [isCreating, setIsCreating] =
    useState<AppContextType["isCreating"]>(false);
  const [fields, setFields] = useState<AppContextType["fields"]>([]);
  const [bg, setBg] = useState<AppContextType["background"]>(null);

  const setIsCreatingHandler = (bool: boolean) => {
    setIsCreating(bool);
  };

  const addField: AppContextType["addField"] = (field: FieldType) => {
    setFields((prev) => [...prev, field]);
  };

  const updateSelectedColor = (
    fieldId: FieldType["id"],
    color: Extract<FieldType, { type: "text" }>["selectedColor"]
  ) => {
    setFields((prevFields) => {
      return prevFields.map((pf) => {
        if (pf.id == fieldId && pf.type === "text") {
          pf.selectedColor = color;
        }

        return pf;
      });
    });
  };

  const removeFieldById: AppContextType["removeField"] = (fieldId) => {
    setFields((prev) => prev.filter((item) => item.id != fieldId));
  };

  const removeFields: AppContextType["removeFields"] = () => {
    setFields([]);
  };

  const setBackground: AppContextType["setBackground"] = (bgSrc) => {
    setBg(bgSrc);
  };

  const resetBackground: AppContextType["resetBackground"] = () => {
    setBg(null);
  };

  return (
    <AppContext.Provider
      value={{
        isCreating,
        setIsCreating: setIsCreatingHandler,
        fields,
        background: bg,
        addField,
        updateSelectedColor,
        removeField: removeFieldById,
        removeFields,
        setBackground,
        resetBackground,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
