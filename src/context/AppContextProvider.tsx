import { FC, ReactNode, useCallback, useState } from "react";
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

  const setIsModalHandler = useCallback((bool: boolean) => setIsModal(bool), [setIsModal]);

  const setIsCreatingHandler = useCallback((bool: boolean) => setIsCreating(bool), [setIsCreating]);

  const addField: AppContextType["addField"] = useCallback(
    (field: FieldType) => {
      setFields((prev) => [...prev.map((el) => ({ ...el, active: false })), field]);
    },
    [setFields],
  );

  const updateSelectedColor = useCallback(
    (fieldId: FieldType["id"], color: Extract<FieldType, { type: "text" }>["selectedColor"]) => {
      setFields((prevFields) => {
        return prevFields.map((pf) => {
          if (pf.id == fieldId && pf.type === "text") {
            pf.selectedColor = color;
          }

          return pf;
        });
      });
    },
    [setFields],
  );

  const changeActiveField = useCallback(
    (fieldId?: FieldType["id"]) => {
      setFields((prev) =>
        prev.map((el) => {
          if (el.id === fieldId) {
            return { ...el, active: true };
          } else {
            return { ...el, active: false };
          }
        }),
      );
    },
    [setFields],
  );

  const removeFieldById: AppContextType["removeField"] = useCallback(
    (fieldId) => {
      setFields((prev) => prev.filter((item) => item.id != fieldId));
    },
    [setFields],
  );

  const removeAllFields: AppContextType["removeAllFields"] = useCallback(() => {
    setFields([]);
  }, [setFields]);

  const setBackground: AppContextType["setBackground"] = useCallback(
    (bgSrc) => {
      setBg(bgSrc);
    },
    [setBg],
  );

  const resetBackground: AppContextType["resetBackground"] = useCallback(() => {
    setBg(null);
  }, [setBg]);

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
