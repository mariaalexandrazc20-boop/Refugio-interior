import React, { useState, useEffect, useRef } from 'react';
import { GuidedMeditation, UserProfile } from '../types';
import { meditationsPool } from '../data/dailySeeds';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Wind,
  CheckCircle2,
  Headphones,
  Music,
  BellRing
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  playTibetanBowl,
  speakSpanishText,
  stopSpanishSpeech,
  toggleAmbientSound,
  playDuolingoSuccessChime
} from '../utils/audio';

interface MeditacionViewProps {
  user: UserProfile;
  initialMeditation: GuidedMeditation;
  onOpenBreathingModal: () => void;
  onCompleteMeditation: () => void;
}

export const MeditacionView: React.FC<MeditacionViewProps> = ({
  user,
  initialMeditation,
  onOpenBreathingModal,
  onCompleteMeditation
}) => {
  const [selectedMeditation, setSelectedMeditation] = useState<GuidedMeditation>(initialMeditation);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepSecondsLeft, setStepSecondsLeft] = useState(
    initialMeditation.steps[0]?.timeSec || 90
  );
  const [ambientSoundActive, setAmbientSoundActive] = useState(false);
  const [voiceNarratorActive, setVoiceNarratorActive] = useState(true);

  const timerRef = useRef<number | null>(null);

  // Switch meditation
  const handleSelectMeditation = (med: GuidedMeditation) => {
    stopSpanishSpeech();
    setIsPlaying(false);
    setSelectedMeditation(med);
    setCurrentStepIndex(0);
    setStepSecondsLeft(med.steps[0]?.timeSec || 90);
  };

  // Timer loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setStepSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Move to next step or complete
        if (currentStepIndex < selectedMeditation.steps.length - 1) {
          const nextIdx = currentStepIndex + 1;
          setCurrentStepIndex(nextIdx);
          playTibetanBowl();

          const nextStep = selectedMeditation.steps[nextIdx];
          if (voiceNarratorActive && nextStep) {
            speakSpanishText(nextStep.guidance);
          }
          return nextStep.timeSec;
        } else {
          // Finished meditation
          setIsPlaying(false);
          playTibetanBowl();
          playDuolingoSuccessChime();
          confetti({ particleCount: 100, spread: 60 });
          onCompleteMeditation();
          return 0;
        }
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentStepIndex, selectedMeditation, voiceNarratorActive, onCompleteMeditation]);

  const handleTogglePlay = () => {
    if (!isPlaying) {
      playTibetanBowl();
      setIsPlaying(true);
      const activeStep = selectedMeditation.steps[currentStepIndex];
      if (voiceNarratorActive && activeStep) {
        speakSpanishText(activeStep.guidance);
      }
    } else {
      stopSpanishSpeech();
      setIsPlaying(false);
    }
  };

  const handleReset = () => {
    stopSpanishSpeech();
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setStepSecondsLeft(selectedMeditation.steps[0]?.timeSec || 90);
  };

  const handleToggleAmbient = () => {
    const nextState = !ambientSoundActive;
    setAmbientSoundActive(nextState);
    toggleAmbientSound(nextState);
  };

  // Format mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const activeStep = selectedMeditation.steps[currentStepIndex];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Quick Launch: Respiración 4-4-6 Bar */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-5 md:p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
            <Wind className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">
              Regulación en 3 minutos
            </span>
            <h3 className="text-lg font-black tracking-tight">
              Respiración Consciente 4-4-6
            </h3>
            <p className="text-xs text-emerald-100 mt-0.5">
              Inhala 4s, retén 4s, exhala 6s. El freno biológico del estrés.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenBreathingModal}
          className="py-3 px-6 rounded-2xl bg-white text-emerald-800 font-bold text-xs uppercase tracking-wider hover:bg-emerald-50 active:scale-95 transition-all shrink-0 shadow-sm"
        >
          Abrir Respirador 4-4-6
        </button>
      </div>

      {/* Guided Meditation Player */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 md:p-8 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
        {/* Header and selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              <span>{selectedMeditation.durationMinutes} minutos</span>
              <span>·</span>
              <span>{selectedMeditation.steps.length} pasos</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {selectedMeditation.title}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
              {selectedMeditation.focus}
            </p>
          </div>

          {/* Sound Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setVoiceNarratorActive(!voiceNarratorActive);
                if (voiceNarratorActive) stopSpanishSpeech();
              }}
              className={`p-2.5 rounded-2xl border-2 text-xs font-bold transition-all flex items-center gap-1.5 ${
                voiceNarratorActive
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                  : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              title="Voz narradora en español"
            >
              <Volume2 className="w-4 h-4" />
              <span>{voiceNarratorActive ? 'Voz activada' : 'Voz apagada'}</span>
            </button>

            <button
              onClick={handleToggleAmbient}
              className={`p-2.5 rounded-2xl border-2 text-xs font-bold transition-all flex items-center gap-1.5 ${
                ambientSoundActive
                  ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300'
                  : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              title="Sonido ambiente de lluvia relajante"
            >
              <Music className="w-4 h-4" />
              <span>{ambientSoundActive ? 'Lluvia zen ON' : 'Lluvia OFF'}</span>
            </button>

            <button
              onClick={playTibetanBowl}
              className="p-2.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold"
              title="Tocar campana tibetana"
            >
              <BellRing className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Meditation Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {meditationsPool.map((med) => {
            const isSelected = med.id === selectedMeditation.id;
            return (
              <button
                key={med.id}
                onClick={() => handleSelectMeditation(med)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {med.title} ({med.durationMinutes}m)
              </button>
            );
          })}
        </div>

        {/* Central Display */}
        <div className="bg-slate-50 dark:bg-slate-800/80 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 text-center relative overflow-hidden flex flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/70 px-3 py-1 rounded-full mb-3">
            Paso {currentStepIndex + 1} de {selectedMeditation.steps.length}: {activeStep?.title}
          </span>

          <p className="text-base md:text-lg font-serif text-slate-800 dark:text-slate-100 max-w-xl leading-relaxed my-3">
            "{activeStep?.guidance}"
          </p>

          <div className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 tabular-nums my-2">
            {formatTime(stepSecondsLeft)}
          </div>

          {/* Main Controls */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={handleReset}
              className="p-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-colors"
              aria-label="Reiniciar meditación"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={handleTogglePlay}
              className={`py-3.5 px-8 rounded-2xl font-bold text-sm uppercase tracking-wider border-b-4 transition-all flex items-center justify-center gap-2 shadow-sm ${
                isPlaying
                  ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-700'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-700 active:border-b-0 active:translate-y-1'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5 fill-white" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-white" />
                  <span>Comenzar</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Steps roadmap */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Estructura de la sesión paso a paso:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {selectedMeditation.steps.map((st, idx) => {
              const isActive = idx === currentStepIndex;
              const isPast = idx < currentStepIndex;
              return (
                <div
                  key={st.step}
                  onClick={() => {
                    setCurrentStepIndex(idx);
                    setStepSecondsLeft(st.timeSec);
                    if (isPlaying && voiceNarratorActive) {
                      speakSpanishText(st.guidance);
                    }
                  }}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                    isActive
                      ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-xs'
                      : isPast
                      ? 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 text-slate-500 dark:text-slate-400'
                      : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                      isActive
                        ? 'bg-emerald-500 text-white'
                        : isPast
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-4 h-4" /> : st.step}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                        {st.title}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        ({formatTime(st.timeSec)})
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {st.guidance}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
