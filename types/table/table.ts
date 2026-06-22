import { ReactElement } from "react";

export interface HeaderInterface {
  title: string | ReactElement;
  align:
    | "-moz-initial"
    | "inherit"
    | "initial"
    | "revert"
    | "revert-layer"
    | "unset"
    | "-webkit-match-parent"
    | "center"
    | "end"
    | "justify"
    | "left"
    | "match-parent"
    | "right"
    | "start";
  colSpan?: number;
  fontSize?: string;
  sizeWidth?: string;
}
