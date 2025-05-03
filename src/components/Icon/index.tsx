import { createElement, useState } from 'react';
import type { IService } from '../../utils/types/Services';

const isSVGComponent = (icon: unknown): icon is React.FC<React.SVGProps<SVGSVGElement>> =>
   typeof icon === 'function';

type Props = { icon: IService['icon']; alt?: string; };

export const Icon = ({ icon, alt = '' }: Props) => {
   const [imgError, setImgError] = useState(false);

   const iconProps = isSVGComponent(icon)
      ? { width: 28, height: 28, fill: 'currentColor' }
      : { size: '1.7rem' };

   return typeof icon === 'string' ?
      !imgError ? (
         <img
            src={icon}
            alt={alt}
            width={28}
            height={28}
            onError={() => setImgError(true)}
            style={{ objectFit: 'contain' }}
         />
      ) : (<span style={{ fontSize: '1.7rem' }}>🧩</span>)
      : (createElement(icon, iconProps));

};
