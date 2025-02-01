import { createContext } from "react";

export type FieldType =
  | { id: string; active: boolean } & (
      | {
          type: "text";
          text: string;
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
  removeField: (fieldId: FieldType["id"]) => void;
  removeFields: () => void;

  background: string | null;
  setBackground: (bgSrc: string) => void;
  resetBackground: () => void;
};

export const AppContext = createContext<AppContextType>({
  isCreating: false,
  setIsCreating: (bool: boolean) => {},

  fields: [],
  addField: (field: FieldType) => {},
  removeField: (fieldId: FieldType["id"]) => {},
  removeFields: () => {},

  background: null,
  setBackground: (bgSrc: string) => {},
  resetBackground: () => {},
});
