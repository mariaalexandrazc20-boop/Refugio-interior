import React, { useState } from 'react';
import { DailyRitual } from '../types';
import { X, Check, Clock, Sparkles, Feather, Heart } from 'lucide-react';
import { playDuolingoSuccessChime } from '../utils/audio';

interface RitualRunnerModalProps {
  ritual: DailyRitual | null;
  onClose: () => void;
  onComplete: (ritualId: string) => void;
  isCompleted: boolean;
}

export const RitualRunnerModal: React.FC<RitualRunnerModalProps> = ({
  ritual,
  onClose,
  onComplete,
  isCompleted
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [journalText, setJournalText] = useState('');
  const [isReleased, setIsReleased] = useState(false);

  if (!ritual) return null;

  const handleFinish = () => {
    playDuolingoSuccessChime();
    onComplete(ritual.id);
    onClose();
  };

  const handleReleaseLetter = () => {
    setIsReleased(true);
    playDuolingoSuccessChime();
    setTimeout(() => {
      onComplete(ritual.id);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full p-6 relative overflow-hidden flex flex-col transition-colors">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Cerrar ritual"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-lg">
            ✨
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>{ritual.category}</span>
              <span>·</span>
              <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                <Clock className="w-3.5 h-3.5" />
                {ritual.duration}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
              {ritual.title}
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 mb-5 leading-relaxed bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
          {ritual.description}
        </p>

        {/* Special interactive area for Forgiveness letter or Gratitude */}
        {ritual.type === 'forgiveness' ? (
          <div className="mb-5 space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Espacio de desahogo y liberación (privado, sólo para ti)
            </label>
            <textarea
              rows={4}
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="Escribe aquí lo que te dolió, a quién liberas o el perdón que te otorgas..."
              className="w-full p-3 text-sm rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-emerald-500 focus:outline-none resize-none font-serif placeholder:font-sans placeholder:text-slate-400 text-slate-800 dark:text-slate-100"
            />
            {isReleased ? (
              <div className="p-3 bg-emerald-100/80 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 rounded-2xl text-center text-xs font-bold animate-pulse">
                🕊️ Has soltado este peso. La paz regresa a tu pecho...
              </div>
            ) : (
              <button
                type="button"
                onClick={handleReleaseLetter}
                disabled={!journalText.trim()}
                className="w-full py-2.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider border-b-4 border-amber-700 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                <Feather className="w-4 h-4" />
                <span>Soltar al viento y perdonar</span>
              </button>
            )}
          </div>
        ) : null}

        {/* Step by step list */}
        <div className="space-y-2.5 mb-6 max-h-56 overflow-y-auto pr-1">
          {ritual.stepByStep.map((step, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border-2 transition-all flex items-start gap-3 ${
                idx === currentStepIndex
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40'
                  : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
              }`}
              onClick={() => setCurrentStepIndex(idx)}
            >
              <span className="w-6 h-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-200 shrink-0">
                {idx + 1}
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                {step}
              </p>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleFinish}
          className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm uppercase tracking-wider border-b-4 transition-all flex items-center justify-center gap-2 shadow-sm ${
            isCompleted
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
              : 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-700 active:border-b-0 active:translate-y-1'
          }`}
        >
          <Check className="w-5 h-5 stroke-[3]" />
          <span>{isCompleted ? 'Volver a marcar como realizado' : '¡Completar Ritual! (+10 Gotas de Paz)'}</span>
        </button>
      </div>
    </div>
  );
};
