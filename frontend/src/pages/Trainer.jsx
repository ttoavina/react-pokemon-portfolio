import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { profile, languages, education } from '../data/profile.js';

const stack = [
  { name: 'PYTHON', icon: 'memory' },
  { name: 'PYTORCH', icon: 'terminal' },
  { name: 'AWS / GCP', icon: 'cloud_done' },
  { name: 'FASTAPI', icon: 'api' },
  { name: 'NEXT.JS', icon: 'javascript' },
  { name: 'PINECONE', icon: 'database' },
];

export default function Trainer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
      {/* Character card */}
      <div className="md:col-span-5 bg-surface-container-lowest border-4 border-on-surface p-4 shadow-pixel-lg relative flex flex-col">
        <div className="absolute top-0 left-0 right-0 h-8 bg-primary border-b-4 border-on-surface flex items-center px-4">
          <span className="font-mono-pixel text-label-sm text-on-primary">
            PARTNER_ID: 001
          </span>
        </div>
        <div className="mt-8 w-full aspect-square border-4 border-on-surface bg-white relative overflow-hidden">
          <div className="absolute inset-0 rpg-grid opacity-50" />
          <img
            src="/avatar.webp"
            alt="Tokiniaina Toavina"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4 bg-tertiary-container border-2 border-on-surface px-3 py-1 shadow-pixel-sm">
            <span className="font-mono-pixel text-label-md text-on-tertiary-container">
              LVL 99
            </span>
          </div>
          <div className="absolute top-4 left-4 bg-secondary-container border-2 border-on-surface px-3 py-1 shadow-pixel-sm">
            <span className="font-mono-pixel text-label-sm text-on-secondary-container">
              {profile.location}
            </span>
          </div>
        </div>
      </div>

      {/* Introduction + CTA */}
      <div className="md:col-span-7 flex flex-col gap-6">
        <div className="bg-surface-container border-4 border-on-surface p-6 shadow-pixel flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <Icon name="chat_bubble" className="text-primary text-4xl" />
            <h2 className="font-mono-pixel font-bold text-headline-lg md:text-display-lg text-primary leading-tight">
              Hello, je suis {profile.name.split(' ')[0]}.
            </h2>
          </div>
          <div className="w-full h-1 bg-on-surface-variant/20 rounded-full" />
          <p className="text-body-lg text-on-surface leading-relaxed">
            <span className="font-bold text-primary">{profile.role}</span> avec{' '}
            <span className="font-bold">{profile.experience}</span> d'expérience. {profile.summary}
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.types.map((t) => (
              <span
                key={t}
                className="px-3 py-1 bg-primary-fixed text-on-primary-fixed border-2 border-on-surface font-mono-pixel text-label-sm rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/pokedex"
            className="group bg-primary text-on-primary font-mono-pixel font-bold text-headline-md border-4 border-on-surface p-4 shadow-pixel pixel-press flex items-center justify-center gap-2"
          >
            <span>VOIR LE POKÉDEX</span>
            <Icon name="menu_book" />
          </Link>
          <Link
            to="/contact"
            className="bg-secondary text-on-secondary font-mono-pixel font-bold text-headline-md border-4 border-on-surface p-4 shadow-pixel pixel-press flex items-center justify-center gap-2"
          >
            <span>SAVE POINT</span>
            <Icon name="phone_in_talk" />
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-gutter mt-4">
        <div className="bg-surface border-4 border-on-surface p-4 shadow-pixel flex flex-col gap-2 transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-center">
            <span className="font-mono-pixel text-label-md text-on-surface-variant">
              TRAINER LEVEL
            </span>
            <Icon name="trending_up" className="text-tertiary" />
          </div>
          <div className="font-mono-pixel font-bold text-headline-lg text-primary">5+ YEARS</div>
          <div className="w-full bg-surface-container border-2 border-on-surface h-4 overflow-hidden">
            <div className="bg-primary h-full w-[85%] border-r-2 border-on-surface" />
          </div>
          <span className="font-mono-pixel text-label-sm text-on-surface-variant text-right">
            EXP: 85,000 / 100,000
          </span>
        </div>

        <div className="bg-surface border-4 border-on-surface p-4 shadow-pixel flex flex-col gap-2 transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-center">
            <span className="font-mono-pixel text-label-md text-on-surface-variant">
              GYM BADGES
            </span>
            <Icon name="military_tech" className="text-tertiary" />
          </div>
          <div className="font-mono-pixel font-bold text-headline-lg text-primary">7 ENTREPRISES</div>
          <div className="flex gap-2 flex-wrap">
            <Icon name="star" filled className="text-tertiary" />
            <Icon name="shield" filled className="text-tertiary" />
            <Icon name="diamond" filled className="text-tertiary" />
            <Icon name="workspace_premium" filled className="text-tertiary" />
            <Icon name="bolt" filled className="text-tertiary" />
            <Icon name="auto_awesome" filled className="text-tertiary" />
            <Icon name="lock" className="text-on-surface-variant/30" />
          </div>
        </div>

        <div className="bg-surface border-4 border-on-surface p-4 shadow-pixel flex flex-col gap-2 transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-center">
            <span className="font-mono-pixel text-label-md text-on-surface-variant">
              MAIN TYPES
            </span>
            <Icon name="category" className="text-tertiary" />
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            <span className="px-3 py-1 bg-secondary text-on-secondary border-2 border-on-surface font-mono-pixel text-label-sm rounded-full">
              GENAI
            </span>
            <span className="px-3 py-1 bg-tertiary-container text-on-tertiary-container border-2 border-on-surface font-mono-pixel text-label-sm rounded-full">
              RAG
            </span>
            <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed border-2 border-on-surface font-mono-pixel text-label-sm rounded-full">
              VISION
            </span>
          </div>
          <p className="font-mono-pixel text-label-sm text-on-surface-variant mt-2 italic">
            Specializing in Hybrid Evolution
          </p>
        </div>
      </div>

      {/* Active skillset */}
      <div className="md:col-span-12 mt-8">
        <h3 className="font-mono-pixel font-bold text-headline-md text-on-surface mb-4 flex items-center gap-2">
          <Icon name="inventory_2" /> ACTIVE STACK
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stack.map((item) => (
            <div
              key={item.name}
              className="bg-surface-container-high border-2 border-on-surface p-4 flex flex-col items-center gap-2 hover:bg-secondary-container transition-colors cursor-help"
            >
              <Icon name={item.icon} className="text-3xl" />
              <span className="font-mono-pixel text-label-sm">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Education + languages */}
      <div className="md:col-span-7 mt-4">
        <h3 className="font-mono-pixel font-bold text-headline-md text-on-surface mb-4 flex items-center gap-2">
          <Icon name="school" /> EDUCATION
        </h3>
        <div className="flex flex-col gap-3">
          {education.map((e) => (
            <div
              key={e.title}
              className="bg-surface border-2 border-on-surface p-4 shadow-pixel-sm flex justify-between items-center gap-4"
            >
              <div>
                <div className="font-mono-pixel font-bold text-label-md text-on-surface">
                  {e.title}
                </div>
                <div className="text-label-sm text-on-surface-variant">{e.school}</div>
              </div>
              <span className="font-mono-pixel text-label-sm text-primary">{e.period}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-5 mt-4">
        <h3 className="font-mono-pixel font-bold text-headline-md text-on-surface mb-4 flex items-center gap-2">
          <Icon name="translate" /> LANGUAGES
        </h3>
        <div className="flex flex-col gap-3">
          {languages.map((l) => (
            <div
              key={l.name}
              className="bg-surface-container-low border-2 border-on-surface p-4 shadow-pixel-sm flex justify-between items-center"
            >
              <span className="font-mono-pixel font-bold text-label-md">{l.name}</span>
              <span className="px-3 py-1 bg-tertiary-fixed border-2 border-on-surface font-mono-pixel text-label-sm">
                {l.level}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Dialogue box */}
      <div className="md:col-span-12 mt-8 bg-on-surface text-background p-6 border-4 border-primary shadow-pixel-lg relative">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 shrink-0 border-2 border-background overflow-hidden">
            <img src="/avatar.webp" alt="Tokiniaina avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono-pixel text-label-md text-primary">
              {profile.name.split(' ')[0].toUpperCase()}:
            </span>
            <p className="text-body-lg leading-relaxed">"{profile.quote}"</p>
          </div>
        </div>
        <div className="absolute bottom-2 right-4 animate-bounce">
          <Icon name="arrow_drop_down" className="text-primary" />
        </div>
      </div>
    </div>
  );
}
