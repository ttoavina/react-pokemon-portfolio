import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { profile } from '../data/profile.js';

const credentials = [
  {
    label: 'EMAIL',
    value: profile.email,
    icon: 'mail',
    href: `mailto:${profile.email}`,
    accent: 'bg-primary text-on-primary',
  },
  {
    label: 'PHONE',
    value: profile.phone,
    icon: 'call',
    href: `tel:${profile.phone.replace(/\s/g, '')}`,
    accent: 'bg-secondary text-on-secondary',
  },
  {
    label: 'LOCATION',
    value: profile.location,
    icon: 'pin_drop',
    href: null,
    accent: 'bg-tertiary-container text-on-tertiary-container',
  },
];

const externals = [
  { label: 'LinkedIn', href: '#', icon: 'link' },
  { label: 'GitHub', href: '#', icon: 'terminal' },
];

export default function Contact() {
  return (
    <div className="rpg-grid -mx-margin-mobile md:-mx-margin-desktop px-margin-mobile md:px-margin-desktop py-8">
      <section className="mb-8">
        <span className="font-mono-pixel text-label-md text-tertiary bg-tertiary-fixed px-3 py-1 border-2 border-on-surface inline-block mb-4">
          SAVE_POINT
        </span>
        <h2 className="font-mono-pixel font-bold text-headline-lg text-primary uppercase cursor-blink">
          Ready to Start a Quest?
        </h2>
        <p className="text-body-lg text-on-surface-variant mt-2 max-w-2xl">
          Mes coordonnées directes. Pour un premier échange rapide, l'assistant chat est sur sa propre page.
        </p>
        <div className="h-1 w-24 bg-on-surface mt-4" />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
        {/* Left credentials */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {credentials.map((c) => {
            const inner = (
              <>
                <div
                  className={`shrink-0 w-14 h-14 border-2 border-on-surface flex items-center justify-center shadow-pixel-sm ${c.accent}`}
                >
                  <Icon name={c.icon} filled />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono-pixel text-label-sm text-on-surface-variant tracking-widest">
                    {c.label}
                  </div>
                  <div className="font-mono-pixel font-bold text-headline-md text-on-surface break-all">
                    {c.value}
                  </div>
                </div>
                {c.href && (
                  <div className="hidden sm:flex items-center gap-1 font-mono-pixel text-label-sm text-primary">
                    <span>OPEN</span>
                    <Icon name="arrow_forward" className="text-sm" />
                  </div>
                )}
              </>
            );
            return c.href ? (
              <a
                key={c.label}
                href={c.href}
                className="bg-surface border-4 border-on-surface p-4 shadow-pixel pixel-press flex items-center gap-4 hover:bg-surface-container-low transition-colors"
              >
                {inner}
              </a>
            ) : (
              <div
                key={c.label}
                className="bg-surface border-4 border-on-surface p-4 shadow-pixel flex items-center gap-4"
              >
                {inner}
              </div>
            );
          })}

          <div className="bg-surface-container p-4 border-4 border-on-surface shadow-pixel flex flex-col gap-3">
            <div>
              <div className="flex justify-between font-mono-pixel text-label-sm mb-1">
                <span>CONNECTION STATUS</span>
                <span>99%</span>
              </div>
              <div className="h-4 w-full bg-surface border-2 border-on-surface overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '99%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between font-mono-pixel text-label-sm mb-1">
                <span>AVAILABILITY</span>
                <span>OPEN</span>
              </div>
              <div className="h-4 w-full bg-surface border-2 border-on-surface overflow-hidden">
                <div className="h-full bg-tertiary" style={{ width: '80%' }} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {externals.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="flex items-center gap-2 bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full border-2 border-on-surface shadow-pixel-sm hover:-translate-y-0.5 transition-transform"
              >
                <Icon name={s.icon} className="text-sm" />
                <span className="font-mono-pixel text-label-md">{s.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right CTA → /chat */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <Link
            to="/chat"
            className="group bg-on-surface text-background border-4 border-primary p-6 shadow-pixel-lg pixel-press flex items-center gap-5"
          >
            <div className="w-20 h-20 shrink-0 rounded-lg border-2 border-background bg-primary-fixed overflow-hidden">
              <img src="/avatar.webp" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-mono-pixel text-label-sm text-primary">TRAINER ASSIST</span>
              <h3 className="font-mono-pixel font-bold text-headline-md mt-1">
                Ouvrir le chat
              </h3>
              <p className="text-body-md mt-1 opacity-90">
                Une page dédiée, sans surcharge — pose tes questions à l'assistant.
              </p>
            </div>
            <div className="hidden sm:flex flex-col items-center gap-1 text-primary">
              <Icon name="arrow_forward" filled />
              <span className="font-mono-pixel text-label-sm">GO</span>
            </div>
          </Link>

          <div className="bg-surface border-4 border-on-surface p-6 shadow-pixel">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="info" className="text-primary" />
              <span className="font-mono-pixel text-label-md text-primary">PRO TIP</span>
            </div>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              Le chat tourne sur sa propre page pour rester confortable à lire sur mobile.
              Tu peux aussi l'ouvrir depuis le bouton flottant présent sur les autres écrans.
            </p>
          </div>
        </div>
      </div>

      <p className="font-mono-pixel text-label-md text-outline italic mt-6 text-center lg:text-left">
        "It's dangerous to go alone! Take this contact card with you."
      </p>
    </div>
  );
}
