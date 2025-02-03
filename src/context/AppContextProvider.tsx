import { FC, ReactNode, useState } from "react";
import { createContext } from "react";
import { Color } from "../utils/types";

export type FieldType = { id: string; active: boolean } & (
  | {
      type: "text";
      text: string;
      selectedColor: Color;
    }
  | {
      type: "image";
      imgSource: string;
    }
);

export type AppContextType = {
  isCreating: boolean;
  setIsCreating: (bool: boolean) => void;

  fields: FieldType[];
  addField: (field: FieldType) => void;
  changeActive: (fieldId?: FieldType["id"]) => void;
  updateSelectedColor: (fieldId: FieldType["id"], color: Extract<FieldType, { type: "text" }>["selectedColor"]) => void;
  removeField: (fieldId: FieldType["id"]) => void;
  removeFields: () => void;

  background: string | null;
  setBackground: (bgSrc: string) => void;
  resetBackground: () => void;

  isModal: boolean;
  setIsModal: (bool: boolean) => void;
};

export const AppContext = createContext<AppContextType>({
  isCreating: false,
  setIsCreating: (_bool: boolean) => {},

  fields: [],
  addField: (_field: FieldType) => {},
  changeActive: (_fieldId?: FieldType["id"]) => {},
  updateSelectedColor: (_fieldId: FieldType["id"], _color: Extract<FieldType, { type: "text" }>["selectedColor"]) => {},
  removeField: (_fieldId: FieldType["id"]) => {},
  removeFields: () => {},

  background: null,
  setBackground: (_bgSrc: string) => {},
  resetBackground: () => {},

  isModal: false,
  setIsModal: (_bool: boolean) => {},
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

  const setIsCreatingHandler = (bool: boolean) => {
    setIsCreating(bool);
  };

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

  const changeActive = (fieldId?: FieldType["id"]) => {
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
        changeActive,
        updateSelectedColor,
        removeField: removeFieldById,
        removeFields,
        setBackground,
        resetBackground,
        isModal,
        setIsModal: setIsModalHandler,
      }}>
      {children}
    </AppContext.Provider>
  );
};
