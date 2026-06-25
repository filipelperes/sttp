import { type RefObject } from "react";

/** Module-level ref to the CommandPalette textarea.
 *  Removed from Zustand state to avoid storing mutable DOM refs in
 *  the store — ref identity is stable; no re-render needed. */
export const commandPaletteInputRef: RefObject<HTMLTextAreaElement | null> = { current: null };
