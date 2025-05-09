// import type { IParsedInput } from "./ParsedInput";
import type { SVGAttributes } from "react";
import type { IconType } from "react-icons";

type IServiceURL = {
   home?: string;
   query?: string;
};

export type IService = {
   name: string;
   url: IServiceURL;
   icon: string | IconType | React.FC<SVGAttributes<SVGElement>>;
   pattern: RegExp;
   style?: {
      backgroundColor?: string;
      backgroundImage?: string;
      color?: string;
   };
};

export type IServicesList = {
   [key: string]: IService;
};
