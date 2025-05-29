import { createElement, memo, useState } from 'react';
import type { IServiceStyle, IServiceIcon } from '@/types/Service';
import './style.css';

type IIconProps = {
   icon: IServiceIcon | undefined;
   width?: number;
   height?: number;
   size?: string;
   alt?: string;
   fill?: string | null;
   style?: IServiceStyle;
};

const Icon = memo(({
   icon,
   alt = '',
   width = 28,
   height = 28,
   size = '1.7rem',
   fill = null,
   style = {
      backgroundImage: "none",
      backgroundColor: "#101010"
   }
}: IIconProps) => {
   const [ImgError, setImgError] = useState(false);
   const props = icon && icon.type === "svgr" ? { width, height } : { size };

   return ImgError || !icon ? (
      <span className='icon' style={{ fontSize: size }}>🧩</span>
   ) : icon.type === "img" ? (
      <img
         src={icon.icon as string}
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
      createElement(
         icon.icon,
         {
            className: "icon",
            fill: fill ?? "currentColor",
            ...props
         }
      )
   );
}, (prev, next) =>
   prev.icon === next.icon &&
   prev.alt === next.alt &&
   prev.width === next.width &&
   prev.height === next.height &&
   prev.size === next.size &&
   prev.fill === next.fill &&
   JSON.stringify(prev.style) === JSON.stringify(next.style)
);

Icon.whyDidYouRender = {
   logOnDifferentValues: true,
   customName: "Icon",
};
export default Icon;