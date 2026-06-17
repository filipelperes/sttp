import { describe, it, expect, beforeEach } from 'vitest';
import useCommandPaletteStore from './index';

describe('CommandPaletteStore', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useCommandPaletteStore.setState({
      Value: '',
      SelectedIdx: 0,
      BodyColor: '#d4d4d4',
      IsScroll: false,
      Show: false,
      Key: null,
      CommandPaletteInputRef: { current: null },
    });
  });

  describe('initial state', () => {
    it('has empty Value', () => {
      expect(useCommandPaletteStore.getState().Value).toBe('');
    });

    it('has SelectedIdx of 0', () => {
      expect(useCommandPaletteStore.getState().SelectedIdx).toBe(0);
    });

    it('has Show set to false', () => {
      expect(useCommandPaletteStore.getState().Show).toBe(false);
    });

    it('has default BodyColor', () => {
      expect(useCommandPaletteStore.getState().BodyColor).toBe('#d4d4d4');
    });

    it('has Key set to null', () => {
      expect(useCommandPaletteStore.getState().Key).toBeNull();
    });
  });

  describe('actions', () => {
    it('setValue updates Value', () => {
      useCommandPaletteStore.getState().setValue('hello');
      expect(useCommandPaletteStore.getState().Value).toBe('hello');
    });

    it('setSelectedIdx updates SelectedIdx', () => {
      useCommandPaletteStore.getState().setSelectedIdx(5);
      expect(useCommandPaletteStore.getState().SelectedIdx).toBe(5);
    });

    it('setBodyColor updates BodyColor', () => {
      useCommandPaletteStore.getState().setBodyColor('#ffffff');
      expect(useCommandPaletteStore.getState().BodyColor).toBe('#ffffff');
    });

    it('setIsScroll updates IsScroll', () => {
      useCommandPaletteStore.getState().setIsScroll(true);
      expect(useCommandPaletteStore.getState().IsScroll).toBe(true);
    });

    it('setShow updates Show', () => {
      useCommandPaletteStore.getState().setShow(true);
      expect(useCommandPaletteStore.getState().Show).toBe(true);
    });

    it('setKey updates Key', () => {
      useCommandPaletteStore.getState().setKey('a');
      expect(useCommandPaletteStore.getState().Key).toBe('a');
    });

    it('setCommandPaletteState merges partial state', () => {
      useCommandPaletteStore.getState().setCommandPaletteState({
        Value: 'test',
        SelectedIdx: 2,
        Show: true,
      });
      const state = useCommandPaletteStore.getState();
      expect(state.Value).toBe('test');
      expect(state.SelectedIdx).toBe(2);
      expect(state.Show).toBe(true);
      expect(state.BodyColor).toBe('#d4d4d4'); // unchanged
    });
  });

  describe('state immutability', () => {
    it('returns a new state object on update', () => {
      const prevState = useCommandPaletteStore.getState();
      useCommandPaletteStore.getState().setValue('new');
      const newState = useCommandPaletteStore.getState();
      expect(newState.Value).toBe('new');
      expect(prevState.Value).toBe(''); // original unchanged
    });
  });
});
