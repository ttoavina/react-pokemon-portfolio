import { Link, useLocation } from 'react-router-dom';
import Icon from '../components/Icon.jsx';

const HIDDEN_ON = ['/chat', '/contact'];

export default function FloatingChatButton() {
  const { pathname } = useLocation();
  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <Link
      to="/chat"
      aria-label="Ouvrir le chat"
      className="fixed bottom-24 right-6 w-14 h-14 bg-tertiary text-on-tertiary border-4 border-on-surface rounded-lg shadow-pixel flex items-center justify-center pixel-press z-40 transition-transform hover:scale-105"
    >
      <Icon name="chat_bubble" filled className="text-2xl" />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#4CAF50] border-2 border-on-surface rounded-full animate-pulse" />
    </Link>
  );
}
