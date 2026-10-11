import React, { useState } from 'react';
import { UserProfile } from '../types';
import { affirmationsPool } from '../data/dailySeeds';
import {
  Volume2,
  Sparkles,
  Heart,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Check,
  Flame,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playDuolingoSuccessChime, speakSpanishText, stopSpanishSpeech } from '../utils/audio';

interface AfirmacionesViewProps {
  user: UserProfile;
  dailyAffirmations: string[];
  onCompleteAffirmation: (index: number) => void;
  onAddDrops: (amount: number) => void;
}

const BODY_RESONANCE_OPTIONS = [
  { id: 'pecho', label: 'Centro del Pecho / Corazón', emoji: '❤️' },
  { id: 'estomago', label: 'Estómago / Plexo Solar', emoji: '☀️' },
  { id: 'garganta', label: 'Garganta y Voz', emoji: '🕊️' },
  { id: 'cuerpo', label: 'En todo mi ser', emoji: '✨' }
];

const EMOTIONAL_EFFECT_OPTIONS = [
  'Me genera alivio y serenidad',
  'Me devuelve la confianza',
  'Es un abrazo suave para mí',
  'La siembro con paciencia'
];

export const AfirmacionesView: React.FC<AfirmacionesViewProps> = ({
  user,
  dailyAffirmations,
  onCompleteAffirmation,
  onAddDrops
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBodyArea, setSelectedBodyArea] = useState<string | null>(null);
  const [selectedEffect, setSelectedEffect] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sessionFinished, setSessionFinished] = useState(false);

  const currentAffirmation = dailyAffirmations[currentIndex];
  const progressPercent = Math.round(((currentIndex) / dailyAffirmations.length) * 100);

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpanishSpeech();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakSpanishText(
        currentAffirmation,
        () => setIsSpeaking(false),
        () => setIsSpeaking(true)
      );
    }
  };

  const handleIntegrate = () => {
    stopSpanishSpeech();
    playDuolingoSuccessChime();
    onCompleteAffirmation(currentIndex);
    onAddDrops(5);

    if (currentIndex < dailyAffirmations.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedBodyArea(null);
      setSelectedEffect(null);
    } else {
      setSessionFinished(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedBodyArea(null);
    setSelectedEffect(null);
    setSessionFinished(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Duolingo Lesson Top Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 md:p-6 border-2 border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌟</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Práctica de Afirmaciones Conscientes
            </span>
          </div>
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-xl">
            Paso {sessionFinished ? dailyAffirmations.length : currentIndex + 1} de {dailyAffirmations.length}
          </span>
        </div>

        {/* Lesson Progress Bar */}
        <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${sessionFinished ? 100 : progressPercent}%` }}
          />
        </div>
      </div>

      {!sessionFinished ? (
        /* Active Card Practice (Duolingo Exercise Style) */
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
          {/* Main Affirmation Display */}
          <div className="text-center py-6 px-4 bg-gradient-to-b from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-slate-900 rounded-3xl border border-emerald-100 dark:border-emerald-900/50 relative">
            <button
              onClick={handleSpeak}
              className={`absolute top-4 right-4 p-2.5 rounded-2xl border-2 transition-all ${
                isSpeaking
                  ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                  : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              title="Escuchar afirmación"
              aria-label="Escuchar afirmación"
            >
              <Volume2 className="w-5 h-5" />
            </button>

            <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-3 py-1 rounded-full mb-4">
              Repite en voz alta con amor
            </span>

            <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 leading-relaxed max-w-xl mx-auto">
              "{currentAffirmation}"
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
              Inhala profundo, siente las palabras en tu respiración y recíbelas como un hecho presente.
            </p>
          </div>

          {/* Interactive Question 1: Where does it resonate? */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              ¿En qué parte de tu cuerpo sientes eco de esta afirmación?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {BODY_RESONANCE_OPTIONS.map((opt) => {
                const isSelected = selectedBodyArea === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedBodyArea(opt.id)}
                    className={`p-3 rounded-2xl border-2 font-medium text-xs text-left transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{opt.emoji}</span>
                    <span className="line-clamp-1">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Question 2: Effect */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              ¿Qué sensación despierta en ti?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {EMOTIONAL_EFFECT_OPTIONS.map((eff) => {
                const isSelected = selectedEffect === eff;
                return (
                  <button
                    key={eff}
                    onClick={() => setSelectedEffect(eff)}
                    className={`p-3 rounded-2xl border-2 font-medium text-xs text-left transition-all ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {eff}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Duolingo Action Button */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
            <button
              onClick={handleSpeak}
              className="py-3 px-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>Escuchar de nuevo</span>
            </button>

            <button
              onClick={handleIntegrate}
              className="py-3.5 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm uppercase tracking-wider border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2 shadow-sm"
            >
              <span>¡La integro en mi corazón!</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Celebration Completed Card */
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border-2 border-emerald-300 dark:border-emerald-800 shadow-sm text-center space-y-5 animate-in zoom-in-95 duration-200 transition-colors">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/80 rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-inner">
            🎉
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
              ¡Misión de Afirmaciones Completada!
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">
              {user.name && user.name.trim().length > 0
                ? `¡Excelente trabajo interior, ${user.name}!`
                : '¡Excelente trabajo interior!'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mt-1">
              Has sembrado 5 pensamientos de alta vibración en tu subconsciente. Cada repetición crea nuevos caminos de paz en tu cerebro.
            </p>
          </div>

          <div className="inline-flex items-center gap-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl py-2 px-5 text-amber-900 dark:text-amber-300 font-bold text-sm">
            <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span>+25 Gotas de Paz obtenidas</span>
          </div>

          <div className="pt-2">
            <button
              onClick={handleRestart}
              className="py-3 px-6 rounded-2xl bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Repetir ronda de afirmaciones</span>
            </button>
          </div>
        </div>
      )}

      {/* Library of additional affirmations */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
        <h4 className="text-base font-black text-slate-900 dark:text-slate-100">
          Biblioteca de Afirmaciones de Apoyo
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {affirmationsPool.slice(5, 13).map((aff, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/60 flex items-center justify-between gap-3 text-xs text-slate-700 dark:text-slate-300 font-medium"
            >
              <span>"{aff}"</span>
              <button
                onClick={() => speakSpanishText(aff)}
                className="text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 shrink-0"
                title="Escuchar"
                aria-label="Escuchar afirmación adicional"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
