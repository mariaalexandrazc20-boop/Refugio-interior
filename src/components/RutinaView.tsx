import React, { useState } from 'react';
import { DailyContent, DailyRitual, SymptomEntry, UserProfile } from '../types';
import {
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Wind,
  Heart,
  Volume2,
  Flame,
  ArrowRight,
  HelpCircle,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playDuolingoSuccessChime, speakSpanishText, stopSpanishSpeech } from '../utils/audio';

interface RutinaViewProps {
  dailyContent: DailyContent;
  user: UserProfile;
  onToggleAffirmation: (index: number) => void;
  onOpenRitual: (ritual: DailyRitual) => void;
  onOpenBreathing: () => void;
  onOpenMeditation: () => void;
  onOpenSymptomDetail: (symptom: SymptomEntry) => void;
  onOpenSummary: () => void;
}

export const RutinaView: React.FC<RutinaViewProps> = ({
  dailyContent,
  user,
  onToggleAffirmation,
  onOpenRitual,
  onOpenBreathing,
  onOpenMeditation,
  onOpenSymptomDetail,
  onOpenSummary
}) => {
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);

  // Total daily items = 5 affirmations + 5 rituals + 1 meditation + 1 emotion explored
  const completedAffsCount = user.completedAffirmationsToday.length;
  const completedRitsCount = user.completedRitualsToday.length;
  const medDone = user.meditationCompletedToday ? 1 : 0;
  const totalCompleted = completedAffsCount + completedRitsCount + medDone;
  const totalGoal = 11;
  const progressPercent = Math.min(100, Math.round((totalCompleted / totalGoal) * 100));

  const handleSpeak = (text: string, idx: number) => {
    if (speakingIndex === idx) {
      stopSpanishSpeech();
      setSpeakingIndex(null);
    } else {
      setSpeakingIndex(idx);
      speakSpanishText(
        text,
        () => setSpeakingIndex(null),
        () => setSpeakingIndex(idx)
      );
    }
  };

  const triggerCelebration = () => {
    playDuolingoSuccessChime();
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Daily Progress Tracker Card (Duolingo Header Style) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 md:p-6 border-2 border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              <span>{dailyContent.formattedDate}</span>
              <span>·</span>
              <span className="text-emerald-700 dark:text-emerald-400">Tu Ruta Diaria</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {user.name && user.name.trim().length > 0
                ? `Progreso de Bienestar de ${user.name}`
                : 'Tu Progreso de Bienestar'}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenSummary}
              className="py-2.5 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Ver Resumen del Día</span>
            </button>
            {totalCompleted >= 5 && (
              <button
                onClick={triggerCelebration}
                className="py-2.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 transition-all"
              >
                🎉 Celebrar
              </button>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
            <span>Objetivo del día: {totalCompleted} de {totalGoal} pasos completados</span>
            <span className="text-emerald-700 dark:text-emerald-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500 shadow-xs"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* SECTION 1: 5 AFIRMACIONES DEL DÍA */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold text-base">
              🌟
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
                1. Cinco Afirmaciones del Día
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Léelas en voz alta, siéntelas en tu cuerpo y márcalas al integrarlas.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
            {completedAffsCount}/5
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dailyContent.affirmations.map((aff, idx) => {
            const isCompleted = user.completedAffirmationsToday.includes(idx.toString());
            return (
              <div
                key={idx}
                className={`p-4 rounded-3xl border-2 transition-all flex items-start justify-between gap-3 ${
                  isCompleted
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-400 dark:border-emerald-600'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => onToggleAffirmation(idx)}
                  className="mt-0.5 shrink-0 text-slate-300 dark:text-slate-600 hover:text-emerald-600 transition-colors"
                  aria-label={isCompleted ? 'Desmarcar afirmación' : 'Marcar afirmación como sentida'}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600 hover:text-slate-400" />
                  )}
                </button>

                <div className="flex-1 cursor-pointer" onClick={() => onToggleAffirmation(idx)}>
                  <p
                    className={`text-sm font-medium leading-relaxed ${
                      isCompleted
                        ? 'text-slate-800 dark:text-slate-100 font-semibold'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    "{aff}"
                  </p>
                </div>

                <button
                  onClick={() => handleSpeak(aff, idx)}
                  className={`p-2 rounded-xl transition-colors shrink-0 ${
                    speakingIndex === idx
                      ? 'bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 animate-pulse'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  aria-label="Escuchar afirmación con voz guiada"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: 5 RITUALES BREVES (<10 MIN) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-base">
              🌿
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
                2. Cinco Rituales de Sanación (&lt; 10 min)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Micro-prácticas accionables para regular tu sistema nervioso hoy.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
            {completedRitsCount}/5
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {dailyContent.rituals.map((rit) => {
            const isDone = user.completedRitualsToday.includes(rit.id);
            return (
              <div
                key={rit.id}
                onClick={() => {
                  if (rit.type === 'breathing') {
                    onOpenBreathing();
                  } else {
                    onOpenRitual(rit);
                  }
                }}
                className={`p-4 rounded-3xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  isDone
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-400 dark:border-emerald-600 shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {rit.category}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/60 px-2 py-0.5 rounded-lg flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {rit.duration}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1.5">
                    {rit.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {rit.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    {rit.type === 'breathing' ? 'Iniciar respiración' : 'Ver pasos'}
                  </span>
                  {isDone ? (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Hecho
                    </span>
                  ) : (
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: 1 MEDITACIÓN GUIADA DEL DÍA */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 flex items-center justify-center font-bold text-base">
            🧘
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
              3. Meditación Guiada del Día
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Un momento sagrado de pausa con voz y ambientación sonora serena.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-slate-900 dark:to-slate-850 rounded-3xl p-5 md:p-6 border-2 border-sky-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-colors">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-800 dark:text-sky-400 mb-1">
              <span>{dailyContent.meditation.durationMinutes} minutos</span>
              <span>·</span>
              <span>{dailyContent.meditation.steps.length} pasos guiados</span>
            </div>
            <h4 className="text-lg md:text-xl font-black text-slate-900 dark:text-slate-100 mb-2">
              {dailyContent.meditation.title}
            </h4>
            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              {dailyContent.meditation.focus}
            </p>

            <div className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-300">
              {dailyContent.meditation.steps.map((st) => (
                <span
                  key={st.step}
                  className="bg-white/80 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700 px-2.5 py-1 rounded-xl font-medium"
                >
                  Paso {st.step}: {st.title}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={onOpenMeditation}
            className="py-3 px-6 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm uppercase tracking-wider border-b-4 border-sky-700 active:border-b-0 active:translate-y-1 transition-all shrink-0 flex items-center justify-center gap-2 shadow-sm"
          >
            <span>{user.meditationCompletedToday ? 'Repetir Meditación' : 'Comenzar Meditación'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* SECTION 4: 1 EMOCIÓN Y SÍNTOMA DEL DÍA */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 flex items-center justify-center font-bold text-base">
            ❤️
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
              4. Emoción del Día: {dailyContent.emotionOfDay.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              La mirada emocional y biológica detrás del síntoma físico.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 md:p-6 border-2 border-slate-200 dark:border-slate-800 space-y-4 shadow-xs transition-colors">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              <span>{dailyContent.emotionOfDay.category}</span>
              <span>·</span>
              <span>Órganos: {dailyContent.emotionOfDay.organsAffected}</span>
            </div>
            <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100">
              {dailyContent.emotionOfDay.name}
            </h4>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="block text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400 mb-1">
              Conflicto y raíz emocional:
            </span>
            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {dailyContent.emotionOfDay.emotionAndConflict}
            </p>
          </div>

          <div className="bg-emerald-50/70 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800/50">
            <span className="block text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-1">
              Mensaje sanador para ti:
            </span>
            <p className="text-xs md:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
              {dailyContent.emotionOfDay.healingMessage}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              onClick={() => onOpenSymptomDetail(dailyContent.emotionOfDay)}
              className="py-2.5 px-4 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Explorar preguntas de autoindagación</span>
            </button>
            <span className="text-xs text-slate-500 dark:text-slate-400 italic text-center sm:text-right">
              Cada síntoma es una invitación a la ternura
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
