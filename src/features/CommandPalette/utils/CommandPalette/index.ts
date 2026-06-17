import type { IServiceStyle } from '@/types/Service';

const setTheme = (style: IServiceStyle | undefined) => {
  document.body.style.setProperty('background-image', style?.backgroundImage ?? 'none');
  document.body.style.setProperty('background-color', style?.backgroundColor ?? '#101010');
  document.body.style.setProperty('color', style?.color ?? '#d4d4d4');
};

const clearTheme = () => {
  document.body.style.removeProperty('background-image');
  document.body.style.removeProperty('background-color');
  document.body.style.removeProperty('color');
};

export { setTheme, clearTheme };
