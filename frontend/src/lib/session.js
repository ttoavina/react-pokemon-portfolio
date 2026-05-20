const SESSION_KEY = 'tt-chat-session';

const randomId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `s-${Date.now()}-${Math.random().toString(16).slice(2)}`;

export function getSessionId() {
  if (typeof window === 'undefined') return null;
  let s = window.localStorage.getItem(SESSION_KEY);
  if (!s) {
    s = randomId();
    window.localStorage.setItem(SESSION_KEY, s);
  }
  return s;
}

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
