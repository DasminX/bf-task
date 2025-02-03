import { TEXT_COLORS } from "./constants";

export type Color = (typeof TEXT_COLORS)[number];

export type ImageFieldType = {
  id: string;
  active: boolean;
  type: "image";
  imgSource: string;
};

export type TextFieldType = {
  id: string;active: boolean;
  type: "text";
  text: string;
  selectedColor: Color;
};

export type FieldType = ImageFieldType | TextFieldType;
