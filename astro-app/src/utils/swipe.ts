/** Shorter touches may still end in a click, so they never count. */
const MIN_DISTANCE = 20;
/** A slow swipe counts from here… */
const DISTANCE = 50;
/** …a quick flick (px per ms) already from MIN_DISTANCE. */
const FLICK_VELOCITY = 0.11;

/**
 * Calls `onSwipe` with 1 after a swipe to the left (next) and -1 after a swipe to the right (previous).
 * Leaves vertical scrolling and pinch-zoom alone.
 */
export function onHorizontalSwipe(
  element: HTMLElement,
  onSwipe: (step: 1 | -1) => void,
  { signal, enabled = () => true }: { signal: AbortSignal; enabled?: () => boolean },
) {
  let start: { x: number; y: number; time: number } | undefined;

  element.addEventListener(
    'touchstart',
    event => {
      const touch = event.touches.length === 1 ? event.touches[0] : undefined;
      start = touch && { x: touch.clientX, y: touch.clientY, time: event.timeStamp };
    },
    { signal, passive: true },
  );
  element.addEventListener('touchcancel', () => (start = undefined), { signal });
  element.addEventListener(
    'touchend',
    event => {
      const from = start;
      start = undefined;
      if (!from || event.touches.length > 0 || (visualViewport?.scale ?? 1) > 1 || !enabled()) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - from.x;
      const distance = Math.abs(dx);
      if (distance < MIN_DISTANCE || distance < Math.abs(touch.clientY - from.y)) return;
      if (distance >= DISTANCE || distance / (event.timeStamp - from.time) > FLICK_VELOCITY) onSwipe(dx < 0 ? 1 : -1);
    },
    { signal },
  );
}
