import { createElement, forwardRef, useState } from 'react';
import type { IService } from '../../utils/types/Services';
import './style.css';

type IIconProps = {
   icon: IService['icon'];
   width?: number;
   height?: number;
   size?: string;
   alt?: string;
   name?: string;
   fill?: string;
   style?: IService['style'];
};

export const Icon = forwardRef<(HTMLSpanElement | HTMLImageElement | SVGElement), IIconProps>(({
   icon,
   alt = '',
   width = 28,
   height = 28,
   size = '1.7rem',
   name = '',
   fill = null,
   style = {
      backgroundImage: "none",
      backgroundColor: "#101010"
   }
}, ref) => {
   const [imgError, setImgError] = useState(false);
   const baseProps = { className: "icon", ref, fill: fill ?? "currentColor" };
   const props = ["ChatGPT", "Ponto Go"].includes(name) ? { width, height } : { size };

   return imgError ? (
      <span ref={ref as React.RefObject<HTMLSpanElement>} className='icon' style={{ fontSize: size }}>🧩</span>
   ) : ["Habbo", "Unisantos"].includes(name) ? (
      <img
         ref={ref as React.RefObject<HTMLImageElement>}
         src={icon as string}
         alt={alt}
         width={width}
         height={height}
         onError={() => setImgError(true)}
         style={{
            objectFit: 'contain',
            backgroundImage: style?.backgroundImage || "none",
            backgroundColor: style?.backgroundColor || "#101010"
         }}
         className='icon'
      />
   ) : (
      createElement(icon, { ...baseProps, ...props })
   );
});
