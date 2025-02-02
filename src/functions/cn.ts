import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// TODO

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));
