import { useEffect, useState } from 'react';
import Icon from '../components/Icon.jsx';
import { skillGroups, recentCatch } from '../data/profile.js';

function HpBar({ value, color }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 200);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <div className="w-full h-6 bg-surface-container border-2 border-on-surface">
      <div
        className={`h-full transition-[width] duration-1000 ease-out ${color}`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

const colorForValue = (v) => {
  if (v >= 70) return 'bg-[#4CAF50]';
  if (v >= 40) return 'bg-[#FFC107]';
  return 'bg-[#F44336]';
};

export default function Skills() {
  return (
    <>
      <section className="mb-8">
        <div className="p-6 bg-surface-container-low border-4 border-on-surface shadow-pixel">
          <h2 className="font-mono-pixel font-bold text-headline-lg text-on-surface mb-2">
            Trainer Skills
          </h2>
          <p className="text-body-lg text-on-surface-variant flex items-center cursor-blink">
            Leveling up the tech-dex. Current proficiency stats updated.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="bg-white border-2 border-on-surface shadow-pixel overflow-hidden flex flex-col"
          >
            <div className={`h-3 w-full ${group.headerBar}`} />
            <div className="p-6 flex-grow">
              <div className="flex items-center justify-between mb-4">
                <Icon name={group.icon} filled className={`text-4xl ${group.accentText}`} />
                <span
                  className={`font-mono-pixel text-label-md px-3 py-1 rounded-full border-2 border-on-surface ${group.accentChip}`}
                >
                  {group.type}
                </span>
              </div>
              <h3 className="font-mono-pixel font-bold text-headline-md mb-4 text-on-surface">
                {group.title}
              </h3>
              <div className="space-y-5">
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="font-mono-pixel text-label-sm">{skill.name}</span>
                      <span className="font-mono-pixel text-label-sm">{skill.value}/100</span>
                    </div>
                    <HpBar value={skill.value} color={colorForValue(skill.value)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <Icon name="auto_awesome" className="text-primary text-3xl" />
          <h2 className="font-mono-pixel font-bold text-headline-md text-on-surface">
            Recent Catch
          </h2>
        </div>
        <div className="bg-white border-4 border-dashed border-on-surface shadow-pixel p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="relative shrink-0">
            <div className="w-32 h-32 bg-primary-fixed rounded-xl border-4 border-on-surface flex items-center justify-center animate-bounce">
              <Icon name="psychology" className="text-6xl text-primary" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-on-surface text-white px-3 py-1 rounded font-mono-pixel text-label-sm">
              NEW!
            </div>
          </div>
          <div className="flex-grow text-center md:text-left">
            <h4 className="font-mono-pixel font-bold text-headline-md mb-2">
              {recentCatch.title}
            </h4>
            <p className="text-body-lg text-on-surface-variant mb-4">{recentCatch.description}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {recentCatch.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono-pixel text-label-sm px-4 py-2 bg-surface-container border-2 border-on-surface rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
