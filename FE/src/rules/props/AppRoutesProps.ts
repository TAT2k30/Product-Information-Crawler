import { Dispatch, SetStateAction } from "react";
import { CommonProps } from "./commons/CommonProps";

export interface AppRoutesProp extends CommonProps {
  isLightMode: boolean;
  setIsLightMode: Dispatch<SetStateAction<boolean>>;
}
