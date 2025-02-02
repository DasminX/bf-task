import { createContext } from "react";
import { ColorType } from "../ui/atoms/TextColor";

export type FieldType =
  | { id: string } & (
      | {
          type: "text";
          text: string;
          selectedColor: ColorType[number];
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
  updateSelectedColor: (
    fieldId: FieldType["id"],
    color: Extract<FieldType, { type: "text" }>["selectedColor"]
  ) => void;
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
  updateSelectedColor: (
    fieldId: FieldType["id"],
    color: Extract<FieldType, { type: "text" }>["selectedColor"]
  ) => {},
  removeField: (fieldId: FieldType["id"]) => {},
  removeFields: () => {},

  background: null,
  setBackground: (bgSrc: string) => {},
  resetBackground: () => {},
});
