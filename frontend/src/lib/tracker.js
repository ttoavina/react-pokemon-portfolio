import { API_URL, getSessionId } from './session.js';

export function trackVisit(path) {
  if (typeof window === 'undefined') return;

  const payload = {
    session_id: getSessionId(),
    path,
    referrer: document.referrer || null,
    screen: `${window.screen.width}x${window.screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    pixel_ratio: window.devicePixelRatio,
    color_scheme: window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
    touch: 'ontouchstart' in window,
  };

  try {
    fetch(`${API_URL}/track/visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* swallow */
  }
}
