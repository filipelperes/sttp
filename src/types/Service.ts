import type { FC, SVGAttributes } from "react";
import type { IconType } from "react-icons";

type IServiceURL = {
   home: string;
   query?: string;
};

type IServiceIcon = {
   icon: string | IconType | FC<SVGAttributes<SVGElement>>;
   type: "svgr" | "react-icons" | "img";
};

type IServiceStyle = {
   backgroundColor: string;
   backgroundImage?: string;
   color?: string;
};

type IService = {
   name: string;
   pattern?: RegExp;
   url: IServiceURL;
   icon: IServiceIcon;
   style: IServiceStyle;
};

type IServicesList = {
   [key: string]: IService;
};

export type { IServiceIcon, IServiceStyle, IService, IServicesList };
