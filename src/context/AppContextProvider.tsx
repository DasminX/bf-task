import { FC, ReactNode, useState } from "react";
import { createContext } from "react";
import { FieldType, TextFieldType } from "../utils/types";

export type AppContextType = {
  isCreating: boolean;
  setIsCreating: (value: AppContextType["isCreating"]) => void;

  fields: FieldType[];
  addField: (field: FieldType) => void;
  removeField: (fieldId: FieldType["id"]) => void;
  removeAllFields: () => void;

  changeActiveField: (fieldId?: FieldType["id"]) => void;

  updateSelectedColor: (fieldId: TextFieldType["id"], color: TextFieldType["selectedColor"]) => void;

  background: string | null;
  setBackground: (bgSrc: AppContextType["background"]) => void;
  resetBackground: () => void;

  isModal: boolean;
  setIsModal: (value: AppContextType["isModal"]) => void;
};

export const AppContext = createContext<AppContextType>({
  isCreating: false,
  setIsCreating: (_value: AppContextType["isCreating"]) => {},

  fields: [],
  addField: (_field: FieldType) => {},
  removeField: (_fieldId: FieldType["id"]) => {},
  removeAllFields: () => {},

  changeActiveField: (_fieldId?: FieldType["id"]) => {},

  updateSelectedColor: (_fieldId: FieldType["id"], _color: Extract<FieldType, { type: "text" }>["selectedColor"]) => {},

  background: null,
  setBackground: (_bgSrc: AppContextType["background"]) => {},
  resetBackground: () => {},

  isModal: false,
  setIsModal: (_value: AppContextType["isModal"]) => {},
});

export type AppContextProviderProps = {
  children: ReactNode;
};
export const AppContextProvider: FC<AppContextProviderProps> = ({ children }) => {
  const [isCreating, setIsCreating] = useState<AppContextType["isCreating"]>(false);
  const [fields, setFields] = useState<AppContextType["fields"]>([]);
  const [bg, setBg] = useState<AppContextType["background"]>(null);
  const [isModal, setIsModal] = useState<AppContextType["isModal"]>(false);

  const setIsModalHandler = (bool: boolean) => setIsModal(bool);

  const setIsCreatingHandler = (bool: boolean) => setIsCreating(bool);

  const addField: AppContextType["addField"] = (field: FieldType) => {
    setFields((prev) => [...prev.map((el) => ({ ...el, active: false })), field]);
  };

  const updateSelectedColor = (
    fieldId: FieldType["id"],
    color: Extract<FieldType, { type: "text" }>["selectedColor"],
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

  const changeActiveField = (fieldId?: FieldType["id"]) => {
    setFields((prev) =>
      prev.map((el) => {
        if (el.id === fieldId) {
          return { ...el, active: true };
        } else {
          return { ...el, active: false };
        }
      }),
    );
  };

  const removeFieldById: AppContextType["removeField"] = (fieldId) => {
    setFields((prev) => prev.filter((item) => item.id != fieldId));
  };

  const removeAllFields: AppContextType["removeAllFields"] = () => {
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
        changeActiveField,
        updateSelectedColor,
        removeField: removeFieldById,
        removeAllFields,
        setBackground,
        resetBackground,
        isModal,
        setIsModal: setIsModalHandler,
      }}>
      {children}
    </AppContext.Provider>
  );
};
