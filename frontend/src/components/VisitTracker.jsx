import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackVisit } from '../lib/tracker.js';

export default function VisitTracker() {
  const location = useLocation();
  const last = useRef({ path: null, ts: 0 });

  useEffect(() => {
    const now = Date.now();
    if (last.current.path === location.pathname && now - last.current.ts < 2000) {
      return;
    }
    last.current = { path: location.pathname, ts: now };
    trackVisit(location.pathname);
  }, [location.pathname]);

  return null;
}
