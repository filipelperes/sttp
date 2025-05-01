export type IService = {
   name: string;
   url: string;
   icon: string;
   pattern: RegExp;
   action: (input?: string) => void;
   style?: {
      backgroundColor?: string;
      backgroundImage?: string;
      color?: string;
   };
};

export type IServicesList = {
   [key: string]: IService;
};
