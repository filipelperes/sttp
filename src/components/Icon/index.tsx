import { createElement, useState } from 'react';
import type { IService } from '../../utils/types/Services';
import './style.css';

type IIconProps = {
   icon: IService['icon'];
   width?: number;
   height?: number;
   size?: string;
   alt?: string;
   name?: string;
};

export const Icon = ({
   icon,
   alt = '',
   width = 28,
   height = 28,
   size = '1.7rem',
   name = '',
}: IIconProps) => {
   const [imgError, setImgError] = useState(false);
   const props = ["ChatGPT", "Ponto Go"].includes(name) ? { width, height, fill: 'currentColor' } : { size };

   return imgError ? (
      <span className='icon' style={{ fontSize: size }}>🧩</span>
   ) : ["Habbo", "Unisantos"].includes(name) ? (
      <img
         src={icon as string}
         alt={alt}
         width={width}
         height={height}
         onError={() => setImgError(true)}
         style={{ objectFit: 'contain' }}
         className='icon'
      />
   ) : (
      createElement(icon, props)
   );
};
