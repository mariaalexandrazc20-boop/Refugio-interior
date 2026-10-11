import React from 'react';
import { EnfoqueType } from '../types';
import { Compass, BookOpen, Sparkles, Heart, CheckCircle2 } from 'lucide-react';

interface EnfoqueSelectorProps {
  currentEnfoque: EnfoqueType;
  onChangeEnfoque: (enfoque: EnfoqueType) => void;
}

interface EnfoqueOption {
  id: EnfoqueType;
  title: string;
  subtitle: string;
  tag: string;
  iconEmoji: string;
  illustrationSvg: React.ReactNode;
  // Soft pastel color styles (light and dark mode)
  cardClass: string;
  activeCardClass: string;
  badgeClass: string;
  titleColor: string;
  subColor: string;
  accentBar: string;
}

export const EnfoqueSelector: React.FC<EnfoqueSelectorProps> = ({
  currentEnfoque,
  onChangeEnfoque
}) => {
  const options: EnfoqueOption[] = [
    {
      id: 'rutina',
      title: 'Rutina',
      subtitle: '5 afirmaciones, 5 rituales y meditación',
      tag: 'Paso a Paso',
      iconEmoji: '🌱',
      illustrationSvg: (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 transition-transform duration-300 group-hover:scale-110"
        >
          {/* Soft mint background blob */}
          <circle cx="32" cy="32" r="28" fill="#D1FAE5" />
          {/* Morning sun rays */}
          <path
            d="M32 10V14M47.5 16.5L44.5 19.5M54 32H50M47.5 47.5L44.5 44.5M16.5 16.5L19.5 19.5M10 32H14"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Earth curve */}
          <path
            d="M16 46C20 42 26 40 32 40C38 40 44 42 48 46"
            stroke="#059669"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Sprouting leaf with dew */}
          <path
            d="M32 40V24C32 24 24 22 24 30C24 36 32 40 32 40Z"
            fill="#34D399"
            stroke="#059669"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M32 32C32 32 40 30 40 36C40 40 32 40 32 40"
            fill="#6EE7B7"
            stroke="#059669"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      ),
      cardClass:
        'bg-[#F2FBF6] hover:bg-[#E8F7EE] dark:bg-emerald-950/20 dark:hover:bg-emerald-950/30 border-emerald-200/80 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-100',
      activeCardClass:
        'bg-[#E6F8EE] dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-500 shadow-md ring-2 ring-emerald-400/30',
      badgeClass:
        'bg-emerald-100/80 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
      titleColor: 'text-emerald-900 dark:text-emerald-100',
      subColor: 'text-emerald-700/80 dark:text-emerald-300/70',
      accentBar: 'bg-emerald-500'
    },
    {
      id: 'diccionario',
      title: 'Diccionario',
      subtitle: '+130 síntomas físicos y raíz emocional',
      tag: 'Biocodificación',
      iconEmoji: '📖',
      illustrationSvg: (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 transition-transform duration-300 group-hover:scale-110"
        >
          {/* Soft sky background blob */}
          <circle cx="32" cy="32" r="28" fill="#E0F2FE" />
          {/* Open book pages */}
          <path
            d="M16 22C21 20 27 21 32 24C37 21 43 20 48 22V44C43 42 37 43 32 46C27 43 21 42 16 44V22Z"
            fill="#BAE6FD"
            stroke="#0284C7"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M32 24V46"
            stroke="#0284C7"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Heart on the page */}
          <path
            d="M32 30C32 30 30 27 28 27C26 27 24.5 28.5 24.5 30.5C24.5 33 28 35 32 37.5C36 35 39.5 33 39.5 30.5C39.5 28.5 38 27 36 27C34 27 32 30 32 30Z"
            fill="#38BDF8"
            stroke="#0369A1"
            strokeWidth="1.5"
          />
        </svg>
      ),
      cardClass:
        'bg-[#F0F8FF] hover:bg-[#E5F2FD] dark:bg-sky-950/20 dark:hover:bg-sky-950/30 border-sky-200/80 dark:border-sky-800/40 text-sky-900 dark:text-sky-100',
      activeCardClass:
        'bg-[#E2F2FE] dark:bg-sky-950/40 border-sky-500 dark:border-sky-500 shadow-md ring-2 ring-sky-400/30',
      badgeClass:
        'bg-sky-100/80 text-sky-800 dark:bg-sky-900/60 dark:text-sky-200',
      titleColor: 'text-sky-900 dark:text-sky-100',
      subColor: 'text-sky-700/80 dark:text-sky-300/70',
      accentBar: 'bg-sky-500'
    },
    {
      id: 'meditacion',
      title: 'Meditación',
      subtitle: 'Audio guiado y respiración 4-4-6',
      tag: 'Paz Interior',
      iconEmoji: '🪷',
      illustrationSvg: (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 transition-transform duration-300 group-hover:scale-110"
        >
          {/* Soft lavender background blob */}
          <circle cx="32" cy="32" r="28" fill="#F3E8FF" />
          {/* Ripple aura waves */}
          <ellipse cx="32" cy="46" rx="20" ry="5" fill="#E9D5FF" />
          <ellipse cx="32" cy="46" rx="14" ry="3.5" fill="#DDD6FE" />
          {/* Lotus petals */}
          <path
            d="M32 20C32 20 27 28 27 36C27 41 32 44 32 44C32 44 37 41 37 36C37 28 32 20 32 20Z"
            fill="#C084FC"
            stroke="#7E22CE"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M27 36C27 36 20 30 18 36C16 41 23 44 30 44C28 41 27 38 27 36Z"
            fill="#E9D5FF"
            stroke="#9333EA"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M37 36C37 36 44 30 46 36C48 41 41 44 34 44C36 41 37 38 37 36Z"
            fill="#E9D5FF"
            stroke="#9333EA"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          {/* Zen light sparkle */}
          <circle cx="32" cy="18" r="2" fill="#A855F7" />
        </svg>
      ),
      cardClass:
        'bg-[#FAF5FF] hover:bg-[#F3E8FF]/60 dark:bg-purple-950/20 dark:hover:bg-purple-950/30 border-purple-200/80 dark:border-purple-800/40 text-purple-900 dark:text-purple-100',
      activeCardClass:
        'bg-[#F3E8FF] dark:bg-purple-950/40 border-purple-500 dark:border-purple-500 shadow-md ring-2 ring-purple-400/30',
      badgeClass:
        'bg-purple-100/80 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200',
      titleColor: 'text-purple-900 dark:text-purple-100',
      subColor: 'text-purple-700/80 dark:text-purple-300/70',
      accentBar: 'bg-purple-500'
    },
    {
      id: 'afirmaciones',
      title: 'Afirmaciones',
      subtitle: 'Alta vibración y resonancia corporal',
      tag: 'Gimnasio del Alma',
      iconEmoji: '✨',
      illustrationSvg: (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 transition-transform duration-300 group-hover:scale-110"
        >
          {/* Soft peach/rose background blob */}
          <circle cx="32" cy="32" r="28" fill="#FFE4E6" />
          {/* Shining heart in center */}
          <path
            d="M32 24C32 24 29 19 25 19C20.5 19 18 22.5 18 26.5C18 32 25 38 32 43C39 38 46 32 46 26.5C46 22.5 43.5 19 39 19C35 19 32 24 32 24Z"
            fill="#FDA4AF"
            stroke="#E11D48"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Radiant sparkling starbursts */}
          <path
            d="M32 12V16M48 20L45 22M52 32H48M16 20L19 22M12 32H16"
            stroke="#F43F5E"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Inner gleam */}
          <circle cx="27" cy="24" r="2" fill="#FFF1F2" />
        </svg>
      ),
      cardClass:
        'bg-[#FFF5F6] hover:bg-[#FFEAEB] dark:bg-rose-950/20 dark:hover:bg-rose-950/30 border-rose-200/80 dark:border-rose-800/40 text-rose-900 dark:text-rose-100',
      activeCardClass:
        'bg-[#FFE4E7] dark:bg-rose-950/40 border-rose-500 dark:border-rose-500 shadow-md ring-2 ring-rose-400/30',
      badgeClass:
        'bg-rose-100/80 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200',
      titleColor: 'text-rose-900 dark:text-rose-100',
      subColor: 'text-rose-700/80 dark:text-rose-300/70',
      accentBar: 'bg-rose-500'
    }
  ];

  return (
    <section className="space-y-3" aria-label="Selector de enfoque al inicio">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Elige tu Enfoque de Hoy
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">·</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
            Acompañamiento amoroso para tu bienestar
          </span>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
          4 Dimensiones
        </span>
      </div>

      {/* Grid of 4 soft colored cards with allusive drawings */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {options.map((opt) => {
          const isActive = currentEnfoque === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onChangeEnfoque(opt.id)}
              className={`group relative text-left rounded-3xl p-3.5 sm:p-4 border-2 transition-all duration-200 flex flex-col justify-between cursor-pointer select-none ${
                isActive ? opt.activeCardClass : opt.cardClass
              } hover:-translate-y-0.5 active:translate-y-0.5 shadow-xs`}
            >
              {/* Top tag & active check badge */}
              <div className="flex items-center justify-between gap-1 mb-2.5">
                <span
                  className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${opt.badgeClass}`}
                >
                  {opt.tag}
                </span>
                {isActive && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                )}
              </div>

              {/* Allusive illustration & Emoji */}
              <div className="flex items-center gap-3 my-1">
                <div className="shrink-0 p-1 rounded-2xl bg-white/70 dark:bg-slate-900/60 shadow-xs border border-white/50 dark:border-slate-800/50">
                  {opt.illustrationSvg}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg leading-none" role="img" aria-label={opt.title}>
                      {opt.iconEmoji}
                    </span>
                    <h3 className={`text-base font-black tracking-tight truncate ${opt.titleColor}`}>
                      {opt.title}
                    </h3>
                  </div>
                  <p className={`text-[11px] leading-tight font-medium mt-1 line-clamp-2 ${opt.subColor}`}>
                    {opt.subtitle}
                  </p>
                </div>
              </div>

              {/* Bottom active indicator line */}
              <div className="mt-3 pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-70 group-hover:opacity-100">
                  {isActive ? 'Activo ahora' : 'Explorar'}
                </span>
                <span
                  className={`w-2 h-2 rounded-full transition-transform ${
                    isActive ? `${opt.accentBar} scale-125` : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
