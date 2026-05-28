import { useSwipeable } from 'react-swipeable';

interface SwipeGesturesOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  preventDefaultTouchmoveEvent?: boolean;
  trackMouse?: boolean;
  delta?: number;
}

export const useSwipeGestures = ({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  preventDefaultTouchmoveEvent = false,
  trackMouse = false,
  delta = 50
}: SwipeGesturesOptions) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => onSwipeLeft?.(),
    onSwipedRight: () => onSwipeRight?.(),
    onSwipedUp: () => onSwipeUp?.(),
    onSwipedDown: () => onSwipeDown?.(),
    preventScrollOnSwipe: preventDefaultTouchmoveEvent,
    trackMouse,
    delta
  });

  return handlers;
};

// Hook spécialisé pour la navigation dans les exercices
export const useExerciseSwipe = (
  onNext: () => void,
  onPrevious: () => void,
  canGoNext: boolean = true,
  canGoPrevious: boolean = true
) => {
  return useSwipeGestures({
    onSwipeLeft: canGoNext ? onNext : undefined,
    onSwipeRight: canGoPrevious ? onPrevious : undefined,
    preventDefaultTouchmoveEvent: true,
    trackMouse: false, // Désactiver pour éviter les conflits avec les clics
    delta: 80 // Plus restrictif pour éviter les swipes accidentels
  });
};