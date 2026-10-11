import React, { useState } from 'react';
import { SymptomEntry, UserProfile } from '../types';
import {
  X,
  Volume2,
  Bookmark,
  BookmarkCheck,
  HelpCircle,
  Sparkles,
  Save,
  Check
} from 'lucide-react';
import { speakSpanishText, stopSpanishSpeech, playDuolingoSuccessChime } from '../utils/audio';

interface SymptomDetailModalProps {
  symptom: SymptomEntry | null;
  onClose: () => void;
  user: UserProfile;
  onToggleSave: (symptomId: string) => void;
  onSaveNote: (topic: string, text: string) => void;
}

export const SymptomDetailModal: React.FC<SymptomDetailModalProps> = ({
  symptom,
  onClose,
  user,
  onToggleSave,
  onSaveNote
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [reflectionText, setReflectionText] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  if (!symptom) return null;

  const isSaved = user.savedSymptoms.includes(symptom.id);

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpanishSpeech();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const fullText = `${symptom.name}. Conflicto emocional: ${symptom.emotionAndConflict}. Mensaje sanador: ${symptom.healingMessage}. Preguntas de autoindagación: ${symptom.inquiryQuestions.join('. ')}. Acción sanadora: ${symptom.ritualOrAffirmation}`;
      speakSpanishText(
        fullText,
        () => setIsSpeaking(false),
        () => setIsSpeaking(true)
      );
    }
  };

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;
    onSaveNote(symptom.name, reflectionText.trim());
    playDuolingoSuccessChime();
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-2xl max-w-xl w-full p-6 relative max-h-[92vh] flex flex-col overflow-hidden transition-colors">
        {/* Top actions */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-xl">
              {symptom.category}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleSpeak}
              className={`p-2 rounded-xl transition-colors ${
                isSpeaking
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Escuchar con voz"
              aria-label="Escuchar síntoma con voz"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onToggleSave(symptom.id)}
              className={`p-2 rounded-xl transition-colors ${
                isSaved
                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={isSaved ? 'Quitar de guardados' : 'Guardar síntoma'}
              aria-label={isSaved ? 'Quitar de guardados' : 'Guardar síntoma'}
            >
              {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1"
              aria-label="Cerrar detalle"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {symptom.name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Órganos y zonas involucradas: <span className="font-semibold text-slate-700 dark:text-slate-300">{symptom.organsAffected}</span>
            </p>
          </div>

          {/* 1. Emoción y Conflicto */}
          <div className="bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 rounded-2xl p-4">
            <span className="block text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400 mb-1">
              Conflicto y Raíz Emocional
            </span>
            <p className="text-xs md:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {symptom.emotionAndConflict}
            </p>
          </div>

          {/* 2. Mensaje Sanador */}
          <div className="bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/60 rounded-2xl p-4">
            <span className="block text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-1">
              Mensaje Sanador del Alma
            </span>
            <p className="text-xs md:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-serif text-base">
              "{symptom.healingMessage}"
            </p>
          </div>

          {/* 3. Preguntas de Autoindagación */}
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Preguntas Clave para Hacerte</span>
            </div>
            <ul className="space-y-2">
              {symptom.inquiryQuestions.map((q, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700 dark:text-slate-300"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Ritual o Afirmación Específica */}
          <div className="bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 rounded-2xl p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-400 mb-1">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Acción o Afirmación Específica</span>
            </div>
            <p className="text-xs md:text-sm text-amber-950 dark:text-amber-200 font-medium leading-relaxed">
              {symptom.ritualOrAffirmation}
            </p>
          </div>

          {/* 5. Personal Reflection Journal */}
          <form onSubmit={handleSaveReflection} className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              {user.name && user.name.trim().length > 0
                ? `¿Qué te resonó de este síntoma hoy, ${user.name}?`
                : '¿Qué te resonó de este síntoma hoy?'}
            </label>
            <textarea
              rows={2}
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="Escribe tu reflexión breve para guardarla en tu diario..."
              className="w-full p-3 text-xs md:text-sm rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-emerald-500 focus:outline-none resize-none text-slate-800 dark:text-slate-100"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!reflectionText.trim()}
                className="py-2 px-4 rounded-xl bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                {noteSaved ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>¡Guardado en tu diario!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Guardar Reflexión</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 dark:text-slate-500">
            Acompañamiento reflexivo · No reemplaza atención médica
          </span>
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider border-b-2 border-emerald-700"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
