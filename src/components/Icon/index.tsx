import { memo, useCallback, useState } from 'react';
import type { IServiceStyle, IServiceIcon } from '@/types/Service';

interface IIconProps {
  icon: IServiceIcon | undefined;
  width?: number;
  height?: number;
  size?: string;
  alt?: string;
  fill?: string | null;
  style?: IServiceStyle;
}

const FALLBACK_ICON = (
  <span className="relative my-auto mx-[7px] text-[1.7rem]">🧩</span>
);

const Icon = memo(({
  icon,
  alt = '',
  width = 28,
  height = 28,
  size = '1.7rem',
  fill = null,
  style,
}: IIconProps) => {
  const [hasError, setHasError] = useState(false);
  const onError = useCallback(() => setHasError(true), []);

  if (hasError || !icon) return FALLBACK_ICON;

  if (icon.type === 'emoji') {
    return (
      <span
        className="relative my-auto mx-[7px] text-[1.7rem] leading-none"
        role="img"
        aria-label={alt || 'icon'}
      >
        {icon.icon as string}
      </span>
    );
  }

  if (icon.type === 'img') {
    return (
      <img
        src={icon.icon as string}
        alt={alt}
        width={width}
        height={height}
        onError={onError}
        style={{
          objectFit: 'contain',
          backgroundImage: style?.backgroundImage || 'none',
          backgroundColor: style?.backgroundColor || '#101010',
        }}
        className="relative my-auto mx-[7px]"
      />
    );
  }

  const IconComponent = icon.icon;
  return (
    <IconComponent
      className="relative my-auto mx-[7px]"
      fill={fill ?? 'currentColor'}
      {...(icon.type === 'svgr' ? { width, height } : { size })}
    />
  );
});

Icon.displayName = 'Icon';
export default Icon;
