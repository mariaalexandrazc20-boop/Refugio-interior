import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { EnfoqueType, UserProfile } from '../types';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  currentEnfoque?: EnfoqueType;
  onChangeEnfoque?: (enfoque: EnfoqueType) => void;
  activeUser?: UserProfile;
  onOpenUserSwitcher?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  onToggleDarkMode
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b-2 border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Peace Bird Mascot + Mini App Name REFUGIO INTERIOR */}
        <div className="flex items-center gap-2.5 select-none">
          <span
            className="w-10 h-10 rounded-2xl bg-[#58CC02] text-white flex items-center justify-center text-2xl shadow-xs border-b-3 border-[#46A302] hover:scale-105 active:scale-95 transition-transform"
            role="img"
            aria-label="Pajarito de la paz"
          >
            🕊️
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-lg md:text-xl font-black tracking-wider uppercase text-[#58CC02]">
              REFUGIO
            </span>
            <span className="text-lg md:text-xl font-black tracking-wider uppercase text-slate-800 dark:text-slate-100">
              INTERIOR
            </span>
          </div>
        </div>

        {/* Right Control: Dark / Light Mode Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleDarkMode}
            className="w-10 h-10 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors shadow-xs"
            title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
