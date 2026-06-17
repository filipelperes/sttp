import type { IServiceStyle } from '@/types/Service';

const setTheme = (style: IServiceStyle | undefined) => {
  document.body.style.setProperty('background-image', style?.backgroundImage ?? 'none');
  document.body.style.setProperty('background-color', style?.backgroundColor ?? 'var(--color-background)');
  document.body.style.setProperty('color', style?.color ?? 'var(--color-foreground)');
  document.body.style.transition = 'background-color 0.3s ease, background-image 0.3s ease, color 0.3s ease';
};

const clearTheme = () => {
  document.body.style.removeProperty('background-image');
  document.body.style.removeProperty('background-color');
  document.body.style.removeProperty('color');
};

export { setTheme, clearTheme };
