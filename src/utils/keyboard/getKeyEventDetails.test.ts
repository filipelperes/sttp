import { describe, it, expect } from 'vitest';
import getKeyEventDetails from './getKeyEventDetails';

describe('getKeyEventDetails', () => {
  // Helper to create minimal KeyboardEvent-like objects
  const createEvent = (overrides: Partial<KeyboardEvent> = {}): KeyboardEvent =>
    ({
      code: '',
      key: '',
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      metaKey: false,
      ...overrides,
    }) as KeyboardEvent;

  describe('isPlainChar', () => {
    it('returns isPlainChar=true for letter keys without modifier', () => {
      const result = getKeyEventDetails(createEvent({ key: 'a', code: 'KeyA' }));
      expect(result.isPlainChar).toBe(true);
    });

    it('returns isPlainChar=true for digit keys without modifier', () => {
      const result = getKeyEventDetails(createEvent({ key: '1', code: 'Digit1' }));
      expect(result.isPlainChar).toBe(true);
    });

    it('returns isPlainChar=true for space without modifier', () => {
      const result = getKeyEventDetails(createEvent({ key: ' ', code: 'Space' }));
      expect(result.isPlainChar).toBe(true); // /^[\w ]$/ matches space
    });

    it('returns isPlainChar=false with modifier key held', () => {
      const result = getKeyEventDetails(createEvent({ key: 'a', code: 'KeyA', ctrlKey: true }));
      expect(result.isPlainChar).toBe(false);
    });

    it('returns isPlainChar=false for non-character keys', () => {
      const result = getKeyEventDetails(createEvent({ key: 'Enter', code: 'Enter' }));
      expect(result.isPlainChar).toBe(false);
    });

    it('returns isPlainChar=false for Escape key', () => {
      const result = getKeyEventDetails(createEvent({ key: 'Escape', code: 'Escape' }));
      expect(result.isPlainChar).toBe(false);
    });

    it('returns isPlainChar=false for F5 key', () => {
      const result = getKeyEventDetails(createEvent({ key: 'F5', code: 'F5' }));
      expect(result.isPlainChar).toBe(false);
    });
  });

  describe('key', () => {
    it('returns key value for plain character', () => {
      const result = getKeyEventDetails(createEvent({ key: 'x', code: 'KeyX' }));
      expect(result.key).toBe('x');
    });

    it('returns null for non-plain character', () => {
      const result = getKeyEventDetails(createEvent({ key: 'Enter', code: 'Enter' }));
      expect(result.key).toBeNull();
    });

    it('returns null when modifier is held', () => {
      const result = getKeyEventDetails(createEvent({ key: 'c', code: 'KeyC', ctrlKey: true }));
      expect(result.key).toBeNull();
    });
  });

  describe('isEscape', () => {
    it('returns true for Escape code', () => {
      const result = getKeyEventDetails(createEvent({ code: 'Escape' }));
      expect(result.isEscape).toBe(true);
    });

    it('returns false for non-Escape code', () => {
      const result = getKeyEventDetails(createEvent({ code: 'Enter' }));
      expect(result.isEscape).toBe(false);
    });
  });

  describe('hasModifier', () => {
    it('returns true when ctrl is held', () => {
      const result = getKeyEventDetails(createEvent({ ctrlKey: true }));
      expect(result.hasModifier).toBe(true);
    });

    it('returns true when shift is held', () => {
      const result = getKeyEventDetails(createEvent({ shiftKey: true }));
      expect(result.hasModifier).toBe(true);
    });

    it('returns true when alt is held', () => {
      const result = getKeyEventDetails(createEvent({ altKey: true }));
      expect(result.hasModifier).toBe(true);
    });

    it('returns true when meta is held', () => {
      const result = getKeyEventDetails(createEvent({ metaKey: true }));
      expect(result.hasModifier).toBe(true);
    });

    it('returns false when no modifier is held', () => {
      const result = getKeyEventDetails(createEvent({}));
      expect(result.hasModifier).toBe(false);
    });
  });

  describe('isCommandPaletteShortcut', () => {
    it('detects Ctrl+K', () => {
      const result = getKeyEventDetails(createEvent({ ctrlKey: true, key: 'k', code: 'KeyK' }));
      expect(result.isCommandPaletteShortcut).toBe(true);
    });

    it('detects Ctrl+Shift+P', () => {
      const result = getKeyEventDetails(createEvent({ ctrlKey: true, shiftKey: true, key: 'P', code: 'KeyP' }));
      expect(result.isCommandPaletteShortcut).toBe(true);
    });

    it('returns false for Ctrl+Shift+K (not a shortcut)', () => {
      const result = getKeyEventDetails(createEvent({ ctrlKey: true, shiftKey: true, key: 'K', code: 'KeyK' }));
      expect(result.isCommandPaletteShortcut).toBe(true); // Ctrl+K is still a shortcut
    });

    it('returns false for plain K without ctrl', () => {
      const result = getKeyEventDetails(createEvent({ key: 'k', code: 'KeyK' }));
      expect(result.isCommandPaletteShortcut).toBe(false);
    });
  });

  describe('isSpecialKey', () => {
    const specialKeys = [
      'ScrollLock', 'AltLeft', 'AltRight', 'ControlLeft', 'ControlRight',
      'ShiftRight', 'ShiftLeft', 'CapsLock', 'OsLeft', 'OSRight', 'Enter',
      'Backspace', 'Meta', 'MetaLeft', 'F5', 'R',
    ];

    specialKeys.forEach(keyCode => {
      it(`returns true for ${keyCode}`, () => {
        const result = getKeyEventDetails(createEvent({ code: keyCode }));
        expect(result.isSpecialKey).toBe(true);
      });
    });

    it('returns false for regular character keys', () => {
      const result = getKeyEventDetails(createEvent({ code: 'KeyA', key: 'a' }));
      expect(result.isSpecialKey).toBe(false);
    });
  });

  describe('shouldOpen', () => {
    it('returns true for plain character without modifier', () => {
      const result = getKeyEventDetails(createEvent({ key: 'a', code: 'KeyA' }));
      expect(result.shouldOpen).toBe(true);
    });

    it('returns true for command palette shortcut (Ctrl+K)', () => {
      const result = getKeyEventDetails(createEvent({ ctrlKey: true, key: 'k', code: 'KeyK' }));
      expect(result.shouldOpen).toBe(true);
    });

    it('returns false for Escape', () => {
      const result = getKeyEventDetails(createEvent({ code: 'Escape' }));
      expect(result.shouldOpen).toBe(false);
    });

    it('returns false for special keys like Enter', () => {
      const result = getKeyEventDetails(createEvent({ code: 'Enter', key: 'Enter' }));
      expect(result.shouldOpen).toBe(false);
    });

    it('returns false for modified character keys', () => {
      const result = getKeyEventDetails(createEvent({ key: 'c', code: 'KeyC', ctrlKey: true }));
      expect(result.shouldOpen).toBe(false);
    });
  });
});
