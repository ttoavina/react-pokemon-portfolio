import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';

export default function TopAppBar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 bg-surface border-b-4 border-on-surface shadow-pixel">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg border-2 border-on-surface overflow-hidden bg-primary-fixed shadow-pixel-sm">
          <img src="/avatar.webp" alt="Tokiniaina avatar" className="w-full h-full object-cover" />
        </div>
        <h1 className="font-mono-pixel font-bold text-headline-md text-primary tracking-tighter hidden sm:block">
          TRAINER PORTFOLIO
        </h1>
        <h1 className="font-mono-pixel font-bold text-headline-md text-primary tracking-tighter sm:hidden">
          PORTFOLIO
        </h1>
      </Link>
      <div className="flex items-center gap-3 text-primary">
        <span className="font-mono-pixel text-label-sm hidden md:inline">LVL 99</span>
        <Icon name="battery_5_bar" filled />
      </div>
    </header>
  );
}
