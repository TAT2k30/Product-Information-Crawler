import { Dispatch, SetStateAction } from "react";
import { CommonProps } from "./commons/CommonProps";

export interface HomePageProps extends CommonProps {
  isLightMode: boolean;
  setLightMode: Dispatch<SetStateAction<boolean>>;
}
