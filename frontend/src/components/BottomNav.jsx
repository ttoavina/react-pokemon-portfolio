import { NavLink } from 'react-router-dom';
import Icon from './Icon.jsx';

const items = [
  { to: '/', label: 'Trainer', icon: 'person' },
  { to: '/pokedex', label: 'Pokédex', icon: 'menu_book' },
  { to: '/skills', label: 'Skills', icon: 'military_tech' },
  { to: '/contact', label: 'Contact', icon: 'save' },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-3 bg-surface-container border-t-4 border-on-surface shadow-pixel-up">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            [
              'flex flex-col items-center justify-center w-20 p-1 pixel-press-sm transition-all',
              isActive
                ? 'bg-primary-container text-on-primary-container rounded-lg border-2 border-on-surface shadow-pixel-sm'
                : 'text-on-surface-variant hover:bg-secondary-container',
            ].join(' ')
          }
        >
          {({ isActive }) => (
            <>
              <Icon name={item.icon} filled={isActive} />
              <span className="font-mono-pixel text-label-sm">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
