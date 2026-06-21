const TOUR_DISMISSED_KEY = 'sttp-tour-dismissed';

/**
 * Whether the user has permanently dismissed the tour ("Don't show again").
 * Returns `false` if never dismissed → tour shows on every startup.
 */
export const isTourDismissed = (): boolean => {
  try {
    return localStorage.getItem(TOUR_DISMISSED_KEY) === 'true';
  } catch {
    return false;
  }
};

/** Permanently dismiss the tour — checked "Don't show again". */
export const dismissTour = (): void => {
  try {
    localStorage.setItem(TOUR_DISMISSED_KEY, 'true');
  } catch {
    // ignore
  }
};

/** Reset dismissal so tour shows again on next startup. */
export const resetTour = (): void => {
  try {
    localStorage.removeItem(TOUR_DISMISSED_KEY);
  } catch {
    // ignore
  }
};
