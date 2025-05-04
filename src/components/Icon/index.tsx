import { createElement, useState } from 'react';
import type { IService } from '../../utils/types/Services';
import { img, svgr } from '../../utils/services';

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

   const isSvg = svgr.includes(name);
   const isImg = img.includes(name);

   const props = isSvg ? { width, height, fill: 'currentColor' } : { size };

   return imgError ? (
      <span style={{ fontSize: size }}>🧩</span>
   ) : isImg ? (
      <img
         src={icon as string}
         alt={alt}
         width={width}
         height={height}
         onError={() => setImgError(true)}
         style={{ objectFit: 'contain' }}
      />)
      : (createElement(icon, props));
};
