// import type { IParsedInput } from "./ParsedInput";
import type { SVGAttributes } from "react";
import type { IconType } from "react-icons";

type IServiceURL = {
   home: string;
   query?: string;
};

export type IServiceStyle = {
   backgroundColor: string;
   backgroundImage?: string;
   color?: string;
};

export type IServiceIcon = {
   icon: string | IconType | React.FC<SVGAttributes<SVGElement>>;
   type: "svgr" | "react-icons" | "img";
};

export type IService = {
   name: string;
   url: IServiceURL;
   icon: IServiceIcon;
   pattern?: RegExp;
   style: IServiceStyle;
};

export type IServicesList = {
   [key: string]: IService;
};
