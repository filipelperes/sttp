import { describe, it, expect, beforeEach } from 'vitest';
import { setTheme, clearTheme } from './index';

describe('CommandPalette theme utilities', () => {
  beforeEach(() => {
    document.body.style.removeProperty('background-image');
    document.body.style.removeProperty('background-color');
    document.body.style.removeProperty('color');
  });

  it('setTheme applies background image', () => {
    setTheme({ backgroundColor: '#ff0000', backgroundImage: 'linear-gradient(red, blue)', color: '#fff' });
    expect(document.body.style.getPropertyValue('background-image')).toBe('linear-gradient(red, blue)');
  });

  it('setTheme applies background color', () => {
    setTheme({ backgroundColor: '#ff0000' });
    expect(document.body.style.getPropertyValue('background-color')).toBe('rgb(255, 0, 0)');
  });

  it('setTheme applies color', () => {
    setTheme({ backgroundColor: '#000', color: '#fff' });
    expect(document.body.style.getPropertyValue('color')).toBe('rgb(255, 255, 255)');
  });

  it('setTheme defaults to none for background image when not provided', () => {
    setTheme({ backgroundColor: '#000' });
    expect(document.body.style.getPropertyValue('background-image')).toBe('none');
  });

  it('setTheme defaults to #101010 for background color when not provided', () => {
    setTheme({ backgroundColor: undefined } as unknown as undefined);
    expect(document.body.style.getPropertyValue('background-color')).toBe('rgb(16, 16, 16)');
  });

  it('setTheme defaults to #d4d4d4 for color when not provided', () => {
    setTheme({ backgroundColor: undefined } as unknown as undefined);
    expect(document.body.style.getPropertyValue('color')).toBe('rgb(212, 212, 212)');
  });

  it('clearTheme removes background-image', () => {
    document.body.style.setProperty('background-image', 'url(test.jpg)');
    clearTheme();
    expect(document.body.style.getPropertyValue('background-image')).toBe('');
  });

  it('clearTheme removes background-color', () => {
    document.body.style.setProperty('background-color', '#ff0000');
    clearTheme();
    expect(document.body.style.getPropertyValue('background-color')).toBe('');
  });

  it('clearTheme removes color', () => {
    document.body.style.setProperty('color', '#fff');
    clearTheme();
    expect(document.body.style.getPropertyValue('color')).toBe('');
  });

  it('handles undefined style gracefully', () => {
    setTheme(undefined);
    expect(document.body.style.getPropertyValue('background-image')).toBe('none');
    expect(document.body.style.getPropertyValue('background-color')).toBe('rgb(16, 16, 16)');
    expect(document.body.style.getPropertyValue('color')).toBe('rgb(212, 212, 212)');
  });
});
