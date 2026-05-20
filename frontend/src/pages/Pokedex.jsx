import { useMemo, useState } from 'react';
import Icon from '../components/Icon.jsx';
import { experiences } from '../data/profile.js';

const accentClassMap = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  outline: 'bg-outline',
  'secondary-fixed-dim': 'bg-secondary-fixed-dim',
  'primary-fixed-dim': 'bg-primary-fixed-dim',
};

const bgClassMap = {
  'primary-fixed': 'bg-primary-fixed',
  'tertiary-container': 'bg-tertiary-container',
  'secondary-container': 'bg-secondary-container',
  'surface-container-highest': 'bg-surface-container-highest',
  'secondary-fixed': 'bg-secondary-fixed',
  'tertiary-fixed': 'bg-tertiary-fixed',
};

const textClassMap = {
  'on-primary-fixed': 'text-on-primary-fixed',
  'on-tertiary-container': 'text-on-tertiary-container',
  'on-secondary-container': 'text-on-secondary-container',
  'on-surface': 'text-on-surface',
  'on-secondary-fixed': 'text-on-secondary-fixed',
  'on-tertiary-fixed': 'text-on-tertiary-fixed',
};

export default function Pokedex() {
  const [selected, setSelected] = useState(null);
  const selectedExp = useMemo(
    () => experiences.find((e) => e.id === selected),
    [selected]
  );

  return (
    <>
      {/* Header */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono-pixel text-label-md text-tertiary bg-tertiary-fixed px-3 py-1 border-2 border-on-surface inline-block mb-4">
              LOG_ENTRY: EXPERIENCES
            </span>
            <h2 className="font-mono-pixel font-bold text-headline-lg text-on-surface">
              Discovery Log
            </h2>
            <p className="text-body-md text-on-surface-variant mt-2">
              Sept entreprises rencontrées — chacune avec son badge et ses stacks.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="bg-surface-container-high border-2 border-on-surface p-2 pixel-press-sm hover:bg-surface-variant transition-all"
            >
              <Icon name="filter_list" className="text-on-surface-variant" />
            </button>
            <button
              type="button"
              className="bg-surface-container-high border-2 border-on-surface p-2 pixel-press-sm hover:bg-surface-variant transition-all"
            >
              <Icon name="sort" className="text-on-surface-variant" />
            </button>
          </div>
        </div>
        <div className="h-1 w-full bg-on-surface mt-6" />
      </section>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {experiences.map((exp) => (
          <article
            key={exp.id}
            className="bg-surface border-4 border-on-surface shadow-pixel hover:bg-surface-container-low transition-colors flex flex-col"
          >
            <div
              className={`h-4 w-full border-b-4 border-on-surface flex justify-end px-2 gap-1 py-1 ${
                accentClassMap[exp.accent] || 'bg-primary'
              }`}
            >
              <div className="w-2 h-full bg-white opacity-50" />
              <div className="w-2 h-full bg-white opacity-50" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div
                  className={`p-4 border-2 border-on-surface shadow-pixel-sm ${
                    bgClassMap[exp.iconBg] || 'bg-secondary-container'
                  }`}
                >
                  <Icon
                    name={exp.icon}
                    filled
                    className={`text-4xl ${textClassMap[exp.iconColor] || 'text-on-surface'}`}
                  />
                </div>
                <span className="font-mono-pixel text-label-sm bg-primary-container text-on-primary-container px-3 py-1 border-2 border-on-surface rounded-full">
                  {exp.type}
                </span>
              </div>
              <h3 className="font-mono-pixel font-bold text-headline-md mb-1">{exp.company}</h3>
              <p className="font-mono-pixel text-label-sm text-primary mb-1">{exp.role}</p>
              <p className="font-mono-pixel text-label-sm text-on-surface-variant mb-4">
                {exp.location} · {exp.period}
              </p>
              <p className="text-body-md text-on-surface-variant mb-6 flex-1">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {exp.stack.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-1 bg-surface-container border-2 border-on-surface font-mono-pixel text-label-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-mono-pixel text-label-sm text-on-surface opacity-60">
                  ID: {exp.id}
                </span>
                <button
                  type="button"
                  onClick={() => setSelected(exp.id)}
                  className="bg-primary text-on-primary font-mono-pixel font-bold text-label-md px-6 py-2 border-2 border-on-surface shadow-pixel-sm pixel-press-sm flex items-center gap-2"
                >
                  VIEW DATA
                  <Icon name="arrow_forward" className="text-sm" />
                </button>
              </div>
            </div>
          </article>
        ))}

        {/* Empty slot */}
        <div className="bg-surface-container border-4 border-dashed border-on-surface-variant opacity-60 flex flex-col items-center justify-center p-12 text-center group transition-all hover:opacity-100">
          <div className="w-20 h-20 rounded-full border-4 border-dashed border-on-surface-variant flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Icon name="add" className="text-4xl text-on-surface-variant" />
          </div>
          <h3 className="font-mono-pixel font-bold text-headline-md text-on-surface-variant mb-2">
            ???
          </h3>
          <p className="text-body-md text-on-surface-variant">
            Searching for new discoveries...
          </p>
        </div>
      </div>

      {/* Footer / pagination */}
      <div className="mt-16 bg-surface-container-high border-4 border-on-surface p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-pixel">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-on-surface flex items-center justify-center text-white font-mono-pixel font-bold text-headline-md">
            !
          </div>
          <div>
            <h4 className="font-mono-pixel text-label-md">LOG STATUS: ACTIVE</h4>
            <p className="text-body-md text-sm text-on-surface-variant">
              {experiences.length} entreprises enregistrées
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            className="px-6 py-2 border-2 border-on-surface bg-surface font-mono-pixel text-label-md pixel-press-sm shadow-pixel-sm opacity-50 cursor-not-allowed"
          >
            PREV
          </button>
          <button
            type="button"
            className="px-6 py-2 border-2 border-on-surface bg-primary text-on-primary font-mono-pixel text-label-md pixel-press-sm shadow-pixel-sm"
          >
            NEXT PAGE
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedExp && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-on-surface/70"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-surface border-4 border-on-surface shadow-pixel-lg max-w-xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute -top-3 -right-3 bg-primary text-on-primary border-2 border-on-surface shadow-pixel-sm w-10 h-10 flex items-center justify-center pixel-press-sm"
            >
              <Icon name="close" />
            </button>
            <span className="font-mono-pixel text-label-sm text-tertiary bg-tertiary-fixed px-2 py-1 border-2 border-on-surface">
              ENTRY {selectedExp.id}
            </span>
            <h3 className="font-mono-pixel font-bold text-headline-lg text-primary mt-4">
              {selectedExp.company}
            </h3>
            <p className="font-mono-pixel text-label-md text-on-surface-variant">
              {selectedExp.role} · {selectedExp.location} · {selectedExp.period}
            </p>
            <div className="h-1 bg-on-surface my-4" />
            <p className="text-body-lg leading-relaxed text-on-surface">
              {selectedExp.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedExp.stack.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 bg-secondary-container text-on-secondary-container border-2 border-on-surface font-mono-pixel text-label-sm rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
