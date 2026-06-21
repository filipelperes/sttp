import { describe, it, expect, vi, beforeEach } from 'vitest';
import getKeyboardActions from './getKeyboardActions';

describe('getKeyboardActions', () => {
  const mockEvent = (code: string, value = 'test') =>
    ({
      code,
      preventDefault: vi.fn(),
      currentTarget: { value },
    }) as unknown as React.KeyboardEvent<HTMLTextAreaElement>;

  const singleSuggestion = {
    matched: true,
    suggestions: [
      ['spotify', {
        name: 'Spotify', url: { home: 'https://spotify.com' },
        icon: { icon: '', type: 'react-icons' as const }, style: { backgroundColor: '#000' },
      }],
    ],
  };

  const multiSuggestions = {
    matched: true,
    suggestions: [
      ['a', { name: 'A' }],
      ['b', { name: 'B' }],
    ],
  };

  const emptySuggestions = {
    matched: false,
    suggestions: [],
  };

  const mockServices = {
    matched: false,
    service: undefined,
    filtered: [],
  };

  const mockServicesMatched = {
    matched: true,
    service: ['spotify', { name: 'Spotify' }],
    filtered: [],
  };

  let mockSetSelectedIdx: ReturnType<typeof vi.fn>;
  let mockSetCommandPaletteState: ReturnType<typeof vi.fn>;
  let mockSetShow: ReturnType<typeof vi.fn>;
  let mockRef: { current: HTMLTextAreaElement | null };

  beforeEach(() => {
    mockSetSelectedIdx = vi.fn();
    mockSetCommandPaletteState = vi.fn();
    mockSetShow = vi.fn();
    mockRef = { current: null };
  });

  describe('Enter key', () => {
    it('returns submit action for Enter', () => {
      const actions = getKeyboardActions(
        mockEvent('Enter'), mockRef, 'test', 0,
        mockSetSelectedIdx, mockSetCommandPaletteState, mockSetShow, singleSuggestion, mockServices, mockServices,
      );
      expect(actions.Enter).toBeDefined();
    });

    it('returns submit action for NumpadEnter', () => {
      const actions = getKeyboardActions(
        mockEvent('NumpadEnter'), mockRef, 'test', 0,
        mockSetSelectedIdx, mockSetCommandPaletteState, mockSetShow, singleSuggestion, mockServices, mockServices,
      );
      expect(actions.NumpadEnter).toBeDefined();
    });
  });

  describe('Tab key', () => {
    it('sets value from selected suggestion', () => {
      const event = mockEvent('Tab');
      const actions = getKeyboardActions(
        event, mockRef, 'test', 0,
        mockSetSelectedIdx, mockSetCommandPaletteState, mockSetShow, singleSuggestion, mockServices,
      );
      actions.Tab();
      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockSetCommandPaletteState).toHaveBeenCalledWith({ Value: 'Spotify', SelectedIdx: 0 });
    });

    it('falls back to current target value when no suggestion matched', () => {
      const event = mockEvent('Tab', 'fallbackValue');
      const actions = getKeyboardActions(
        event, mockRef, 'ignored', 0,
        mockSetSelectedIdx, mockSetCommandPaletteState, mockSetShow, emptySuggestions, mockServices,
      );
      actions.Tab();
      expect(mockSetCommandPaletteState).toHaveBeenCalledWith({ Value: 'fallbackValue', SelectedIdx: 0 });
    });
  });

  describe('Escape key', () => {
    it('calls setShow(false)', () => {
      const actions = getKeyboardActions(
        mockEvent('Escape'), mockRef, 'test', 0,
        mockSetSelectedIdx, mockSetCommandPaletteState, mockSetShow, singleSuggestion, mockServices,
      );
      actions.Escape();
      expect(mockSetShow).toHaveBeenCalledWith(false);
    });
  });

  describe('ArrowDown', () => {
    it('increments selected index with multiple suggestions', () => {
      const event = mockEvent('ArrowDown');
      const actions = getKeyboardActions(
        event, mockRef, 'test', 0,
        mockSetSelectedIdx, mockSetCommandPaletteState, mockSetShow, multiSuggestions, mockServices,
      );
      actions.ArrowDown();
      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockSetSelectedIdx).toHaveBeenCalledWith(1);
    });

    it('wraps to 0 when at last item', () => {
      const event = mockEvent('ArrowDown');
      const actions = getKeyboardActions(
        event, mockRef, 'test', 0,
        mockSetSelectedIdx, mockSetCommandPaletteState, mockSetShow, singleSuggestion, mockServices,
      );
      actions.ArrowDown();
      expect(mockSetSelectedIdx).toHaveBeenCalledWith(0);
    });
  });

  describe('ArrowUp', () => {
    it('decrements selected index', () => {
      const event = mockEvent('ArrowUp');
      const actions = getKeyboardActions(
        event, mockRef, 'test', 1,
        mockSetSelectedIdx, mockSetCommandPaletteState, mockSetShow, multiSuggestions, mockServices,
      );
      actions.ArrowUp();
      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockSetSelectedIdx).toHaveBeenCalledWith(0);
    });

    it('wraps to last item when at index 0', () => {
      const event = mockEvent('ArrowUp');
      const actions = getKeyboardActions(
        event, mockRef, 'test', 0,
        mockSetSelectedIdx, mockSetCommandPaletteState, mockSetShow, singleSuggestion, mockServices,
      );
      actions.ArrowUp();
      expect(mockSetSelectedIdx).toHaveBeenCalledWith(0);
    });
  });

  describe('Home key', () => {
    it('sets selected index to 0 when suggestions matched', () => {
      const event = mockEvent('Home');
      const actions = getKeyboardActions(
        event, mockRef, 'test', 2,
        mockSetSelectedIdx, mockSetCommandPaletteState, mockSetShow, singleSuggestion, mockServices,
      );
      actions.Home();
      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockSetSelectedIdx).toHaveBeenCalledWith(0);
    });

    it('moves cursor to start when no suggestions matched', () => {
      const event = mockEvent('Home');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const inputEl = { setSelectionRange: vi.fn(), scroll: vi.fn() } as any;
      mockRef.current = inputEl;
      const actions = getKeyboardActions(
        event, mockRef, 'test', 0,
        mockSetSelectedIdx, mockSetCommandPaletteState, mockSetShow, emptySuggestions, mockServices,
      );
      actions.Home();
      expect(inputEl.setSelectionRange).toHaveBeenCalledWith(0, 0);
      expect(inputEl.scroll).toHaveBeenCalled();
    });
  });

  describe('End key', () => {
    it('sets selected index to last when suggestions matched', () => {
      const event = mockEvent('End');
      const actions = getKeyboardActions(
        event, mockRef, 'test', 0,
        mockSetSelectedIdx, mockSetCommandPaletteState, mockSetShow, singleSuggestion, mockServices,
      );
      actions.End();
      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockSetSelectedIdx).toHaveBeenCalledWith(0);
    });

    it('moves cursor to end when no suggestions matched', () => {
      const event = mockEvent('End', 'hello');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const inputEl = { setSelectionRange: vi.fn(), scroll: vi.fn() } as any;
      mockRef.current = inputEl;
      const actions = getKeyboardActions(
        event, mockRef, 'hello', 0,
        mockSetSelectedIdx, mockSetCommandPaletteState, mockSetShow, emptySuggestions, mockServices,
      );
      actions.End();
      expect(inputEl.setSelectionRange).toHaveBeenCalledWith(5, 5);
    });
  });
});
