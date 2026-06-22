import { ReactNode } from "react";
import { InputFilterProductsInterface } from "../store";

export interface InputFieldDetailSearchInterface {
  key: keyof InputFilterProductsInterface;
  label: string;
  placeholder: string;
  isMulti: boolean;
  isSelect: boolean;
  icon: ReactNode;
}
