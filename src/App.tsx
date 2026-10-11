import React, { useState, useEffect, useMemo } from 'react';
import {
  DailyContent,
  DailyRitual,
  EnfoqueType,
  SymptomEntry,
  UserProfile
} from './types';
import { getDailyContent } from './data/dailySeeds';
import { symptomsDictionary } from './data/symptomsDictionary';
import { Navbar } from './components/Navbar';
import { MascotZen } from './components/MascotZen';
import { MedicalDisclaimerBanner } from './components/MedicalDisclaimerBanner';
import { EnfoqueSelector } from './components/EnfoqueSelector';
import { RutinaView } from './components/RutinaView';
import { DiccionarioView } from './components/DiccionarioView';
import { MeditacionView } from './components/MeditacionView';
import { AfirmacionesView } from './components/AfirmacionesView';
import { BreathingModal } from './components/BreathingModal';
import { RitualRunnerModal } from './components/RitualRunnerModal';
import { SymptomDetailModal } from './components/SymptomDetailModal';
import { UserSwitcherModal } from './components/UserSwitcherModal';
import { SessionSummaryModal } from './components/SessionSummaryModal';
import {
  Search,
  Share2,
  Edit3,
  Check
} from 'lucide-react';
import { playDuolingoSuccessChime } from './utils/audio';

const STORAGE_USERS_KEY = 'refugio_interior_users_v3';
const STORAGE_ACTIVE_USER_KEY = 'refugio_interior_active_user_v3';
const STORAGE_THEME_KEY = 'refugio_interior_theme_v1';

// Default user starts with blank name so each person places their own name
const DEFAULT_USERS: UserProfile[] = [
  {
    id: 'user-default',
    name: '', // Left blank so each person can put their name
    avatar: '👤',
    streakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    serenityDrops: 0,
    completedRitualsToday: [],
    completedAffirmationsToday: [],
    meditationCompletedToday: false,
    savedSymptoms: [],
    notes: []
  }
];

export default function App() {
  // Dark mode state with persistence in localStorage
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_THEME_KEY);
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Apply dark mode class to html documentElement
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_THEME_KEY, isDarkMode ? 'dark' : 'light');
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.warn('Theme storage error', e);
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Current user profiles in state & localStorage
  const [users, setUsers] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_USERS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Storage read error', e);
    }
    return DEFAULT_USERS;
  });

  const [activeUserId, setActiveUserId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ACTIVE_USER_KEY);
      if (saved) return saved;
    } catch (e) {
      console.warn('Storage read error', e);
    }
    return DEFAULT_USERS[0].id;
  });

  // Current active user object
  const activeUser = useMemo(() => {
    return users.find((u) => u.id === activeUserId) || users[0] || DEFAULT_USERS[0];
  }, [users, activeUserId]);

  // Inline name editing state for the active user
  const [isEditingInlineName, setIsEditingInlineName] = useState(!activeUser.name);
  const [inlineNameInput, setInlineNameInput] = useState(activeUser.name || '');

  // Keep input in sync when active user changes
  useEffect(() => {
    setInlineNameInput(activeUser.name || '');
    if (!activeUser.name) {
      setIsEditingInlineName(true);
    } else {
      setIsEditingInlineName(false);
    }
  }, [activeUser.id, activeUser.name]);

  // Main Navigation / Enfoque Input (select, required): rutina | diccionario | meditacion | afirmaciones
  const [enfoque, setEnfoque] = useState<EnfoqueType>('rutina');

  // Consulta Input (string, opcional): síntoma, enfermedad o emoción a explorar
  const [consulta, setConsulta] = useState<string>('');

  // Daily seed date
  const [selectedDate] = useState<Date>(new Date());
  const dailyContent: DailyContent = useMemo(() => {
    return getDailyContent(selectedDate);
  }, [selectedDate]);

  // Modals state
  const [isBreathingModalOpen, setIsBreathingModalOpen] = useState(false);
  const [activeRitual, setActiveRitual] = useState<DailyRitual | null>(null);
  const [activeSymptomDetail, setActiveSymptomDetail] = useState<SymptomEntry | null>(null);
  const [isUserSwitcherOpen, setIsUserSwitcherOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  // Sync users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
      localStorage.setItem(STORAGE_ACTIVE_USER_KEY, activeUserId);
    } catch (e) {
      console.warn('Storage write error', e);
    }
  }, [users, activeUserId]);

  // Helper to update current user
  const updateActiveUser = (updater: (prev: UserProfile) => UserProfile) => {
    const todayStr = new Date().toISOString().split('T')[0];
    setUsers((prevList) =>
      prevList.map((u) => {
        if (u.id !== activeUser.id) return u;
        const updated = updater(u);
        const existingHistory = updated.historyPoints || [];
        const hasToday = existingHistory.some((h) => h.date === todayStr);
        const updatedHistory = hasToday
          ? existingHistory.map((h) => (h.date === todayStr ? { ...h, drops: updated.serenityDrops } : h))
          : [...existingHistory, { date: todayStr, drops: updated.serenityDrops }];
        return {
          ...updated,
          historyPoints: updatedHistory
        };
      })
    );
  };

  // Save the name placed by the user
  const handleSaveInlineName = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inlineNameInput.trim()) return;
    updateActiveUser((prev) => ({
      ...prev,
      name: inlineNameInput.trim()
    }));
    setIsEditingInlineName(false);
    playDuolingoSuccessChime();
  };

  // Add new user profile
  const handleAddUser = (name: string, avatar: string) => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name,
      avatar,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      serenityDrops: 10,
      completedRitualsToday: [],
      completedAffirmationsToday: [],
      meditationCompletedToday: false,
      savedSymptoms: [],
      notes: []
    };
    setUsers((prev) => [...prev, newUser]);
    setActiveUserId(newUser.id);
  };

  // Update a user's name
  const handleUpdateUserName = (userId: string, newName: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, name: newName } : u))
    );
  };

  // Toggle affirmation completion
  const handleToggleAffirmation = (index: number) => {
    const key = index.toString();
    updateActiveUser((prev) => {
      const exists = prev.completedAffirmationsToday.includes(key);
      const updated = exists
        ? prev.completedAffirmationsToday.filter((k) => k !== key)
        : [...prev.completedAffirmationsToday, key];

      const dropDiff = exists ? -5 : 5;
      return {
        ...prev,
        completedAffirmationsToday: updated,
        serenityDrops: Math.max(0, prev.serenityDrops + dropDiff)
      };
    });
    playDuolingoSuccessChime();
  };

  // Mark ritual complete
  const handleCompleteRitual = (ritualId: string) => {
    updateActiveUser((prev) => {
      if (prev.completedRitualsToday.includes(ritualId)) return prev;
      return {
        ...prev,
        completedRitualsToday: [...prev.completedRitualsToday, ritualId],
        serenityDrops: prev.serenityDrops + 10
      };
    });
  };

  // Mark meditation complete
  const handleCompleteMeditation = () => {
    updateActiveUser((prev) => ({
      ...prev,
      meditationCompletedToday: true,
      serenityDrops: prev.serenityDrops + 20
    }));
  };

  // Toggle save symptom
  const handleToggleSaveSymptom = (symptomId: string) => {
    updateActiveUser((prev) => {
      const exists = prev.savedSymptoms.includes(symptomId);
      return {
        ...prev,
        savedSymptoms: exists
          ? prev.savedSymptoms.filter((id) => id !== symptomId)
          : [...prev.savedSymptoms, symptomId]
      };
    });
    playDuolingoSuccessChime();
  };

  // Save personal note
  const handleSaveNote = (topic: string, text: string) => {
    updateActiveUser((prev) => ({
      ...prev,
      notes: [
        ...prev.notes,
        {
          id: `note-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          topic,
          content: text
        }
      ]
    }));
  };

  // If user searched for a consulta, open detail or filter
  const handleConsultaSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consulta.trim()) return;
    setEnfoque('diccionario');
    const exact = symptomsDictionary.find(
      (s) =>
        s.name.toLowerCase().includes(consulta.toLowerCase()) ||
        s.id.toLowerCase().includes(consulta.toLowerCase())
    );
    if (exact) {
      setActiveSymptomDetail(exact);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FA] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-emerald-200 transition-colors duration-200">
      {/* Duolingo Style Top Bar with Dark Mode Toggle */}
      <Navbar
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 py-6 space-y-6">
        {/* Welcome Banner & Mascot Greeting with Name Slot */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 md:p-6 border-2 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <MascotZen
              mood="welcoming"
              userName={activeUser.name}
              message={
                activeUser.name
                  ? `¡Hola ${activeUser.name}! Tu espacio está listo para brindarte paz hoy.`
                  : '¡Bienvenido/a! Escribe tu nombre para personalizar tu día.'
              }
            />

            {/* Name Input / Edit Badge */}
            {isEditingInlineName ? (
              <form onSubmit={handleSaveInlineName} className="flex items-center gap-2 mt-2 sm:mt-0">
                <input
                  type="text"
                  autoFocus
                  value={inlineNameInput}
                  onChange={(e) => setInlineNameInput(e.target.value)}
                  placeholder="Escribe tu nombre..."
                  className="px-3 py-1.5 rounded-xl border-2 border-emerald-400 dark:border-emerald-600 bg-emerald-50/50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-bold focus:outline-none focus:border-emerald-500 w-44"
                />
                <button
                  type="submit"
                  disabled={!inlineNameInput.trim()}
                  className="py-1.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider border-b-2 border-emerald-700 active:border-b-0 active:translate-y-0.5 disabled:opacity-50 transition-all flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Guardar</span>
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-1.5 mt-2 sm:mt-0">
                <button
                  onClick={() => setIsEditingInlineName(true)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 px-2 py-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  title="Cambiar tu nombre"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Cambiar nombre</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Explorer Form & Summary button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <form onSubmit={handleConsultaSearch} className="relative flex-1 sm:w-60">
              <input
                type="text"
                value={consulta}
                onChange={(e) => setConsulta(e.target.value)}
                placeholder="Explorar síntoma o emoción..."
                className="w-full pl-9 pr-3 py-2 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium focus:border-emerald-500 focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </form>

            <button
              onClick={() => setIsSummaryOpen(true)}
              className="py-2 px-3.5 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shrink-0"
              title="Ver el informe completo del día"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Resumen Sesión</span>
            </button>
          </div>
        </div>

        {/* Dimension / Enfoque Selector at the beginning with allusive drawings and soft colors */}
        <EnfoqueSelector
          currentEnfoque={enfoque}
          onChangeEnfoque={(enf) => {
            setEnfoque(enf);
          }}
        />

        {/* View Switcher Container */}
        {enfoque === 'rutina' && (
          <RutinaView
            dailyContent={dailyContent}
            user={activeUser}
            onToggleAffirmation={handleToggleAffirmation}
            onOpenRitual={(rit) => setActiveRitual(rit)}
            onOpenBreathing={() => setIsBreathingModalOpen(true)}
            onOpenMeditation={() => setEnfoque('meditacion')}
            onOpenSymptomDetail={(sym) => setActiveSymptomDetail(sym)}
            onOpenSummary={() => setIsSummaryOpen(true)}
          />
        )}

        {enfoque === 'diccionario' && (
          <DiccionarioView
            initialQuery={consulta}
            user={activeUser}
            onToggleSaveSymptom={handleToggleSaveSymptom}
            onOpenSymptomDetail={(sym) => setActiveSymptomDetail(sym)}
          />
        )}

        {enfoque === 'meditacion' && (
          <MeditacionView
            user={activeUser}
            initialMeditation={dailyContent.meditation}
            onOpenBreathingModal={() => setIsBreathingModalOpen(true)}
            onCompleteMeditation={handleCompleteMeditation}
          />
        )}

        {enfoque === 'afirmaciones' && (
          <AfirmacionesView
            user={activeUser}
            dailyAffirmations={dailyContent.affirmations}
            onCompleteAffirmation={handleToggleAffirmation}
            onAddDrops={(amt) => {
              updateActiveUser((prev) => ({
                ...prev,
                serenityDrops: prev.serenityDrops + amt
              }));
            }}
          />
        )}

        {/* Ethical Medical Disclaimer Banner */}
        <MedicalDisclaimerBanner />
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 px-4 text-center text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-200">
            <span>🌿 Refugio Interior</span>
            <span>·</span>
            <span>Acompañamiento Emocional Diario</span>
          </div>

          <p className="text-[11px] text-slate-400">
            Diseñado para la calma, la presencia y el autocuidado compasivo.
          </p>

          <button
            onClick={() => setIsUserSwitcherOpen(true)}
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300"
          >
            Perfil actual: {activeUser.name || 'Sin nombre'} ({activeUser.avatar})
          </button>
        </div>
      </footer>

      {/* Modals */}
      <BreathingModal
        isOpen={isBreathingModalOpen}
        onClose={() => setIsBreathingModalOpen(false)}
        onComplete={() => {
          handleCompleteRitual('rit-respiracion-446');
          setIsBreathingModalOpen(false);
        }}
      />

      <RitualRunnerModal
        ritual={activeRitual}
        onClose={() => setActiveRitual(null)}
        onComplete={handleCompleteRitual}
        isCompleted={activeRitual ? activeUser.completedRitualsToday.includes(activeRitual.id) : false}
      />

      <SymptomDetailModal
        symptom={activeSymptomDetail}
        onClose={() => setActiveSymptomDetail(null)}
        user={activeUser}
        onToggleSave={handleToggleSaveSymptom}
        onSaveNote={handleSaveNote}
      />

      <UserSwitcherModal
        isOpen={isUserSwitcherOpen}
        onClose={() => setIsUserSwitcherOpen(false)}
        users={users}
        activeUserId={activeUserId}
        onSelectUser={(id) => setActiveUserId(id)}
        onAddUser={handleAddUser}
        onUpdateUserName={handleUpdateUserName}
      />

      <SessionSummaryModal
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
        userName={activeUser.name}
        enfoque={enfoque}
        consulta={consulta}
        dailyContent={dailyContent}
        user={activeUser}
      />
    </div>
  );
}
