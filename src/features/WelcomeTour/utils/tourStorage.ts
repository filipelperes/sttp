const TOUR_KEY = 'sttp-tour-dismissed';

export const isTourDismissed = (): boolean => {
  try {
    return localStorage.getItem(TOUR_KEY) === 'true';
  } catch {
    return false;
  }
};

export const dismissTour = (): void => {
  try {
    localStorage.setItem(TOUR_KEY, 'true');
  } catch {
    // ignore
  }
};

export const resetTour = (): void => {
  try {
    localStorage.removeItem(TOUR_KEY);
  } catch {
    // ignore
  }
};
