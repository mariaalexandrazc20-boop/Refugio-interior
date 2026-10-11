import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { playBreathCue, playDuolingoSuccessChime } from '../utils/audio';

interface BreathingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

type Phase = 'inhale' | 'hold' | 'exhale';

export const BreathingModal: React.FC<BreathingModalProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>('inhale');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [cycle, setCycle] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const totalCycles = 4; // ~1 min session

  const timerRef = useRef<number | null>(null);

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setIsActive(false);
      setPhase('inhale');
      setSecondsLeft(4);
      setCycle(1);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Transition between phases
        if (phase === 'inhale') {
          if (soundEnabled) playBreathCue('hold');
          setPhase('hold');
          return 4;
        } else if (phase === 'hold') {
          if (soundEnabled) playBreathCue('exhale');
          setPhase('exhale');
          return 6;
        } else {
          // Finished exhale, next cycle
          if (cycle >= totalCycles) {
            setIsActive(false);
            playDuolingoSuccessChime();
            onComplete();
            return 4;
          }
          if (soundEnabled) playBreathCue('inhale');
          setPhase('inhale');
          setCycle((c) => c + 1);
          return 4;
        }
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, phase, cycle, soundEnabled, totalCycles, onComplete]);

  const handleStart = () => {
    setIsActive(true);
    if (soundEnabled) playBreathCue(phase);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('inhale');
    setSecondsLeft(4);
    setCycle(1);
  };

  if (!isOpen) return null;

  const phaseDetails = {
    inhale: {
      text: 'Inhala suave por la nariz',
      color: 'text-emerald-700',
      bgGlow: 'bg-emerald-400/20 border-emerald-400',
      scaleClass: 'scale-125 duration-[4000ms]'
    },
    hold: {
      text: 'Sostén con calma y quietud',
      color: 'text-amber-700',
      bgGlow: 'bg-amber-400/20 border-amber-400',
      scaleClass: 'scale-125 duration-[1000ms]'
    },
    exhale: {
      text: 'Exhala lento soltando los hombros',
      color: 'text-sky-700',
      bgGlow: 'bg-sky-400/20 border-sky-400',
      scaleClass: 'scale-90 duration-[6000ms]'
    }
  };

  const current = phaseDetails[phase];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full p-6 text-center relative overflow-hidden flex flex-col items-center transition-colors">
        {/* Top Controls */}
        <div className="w-full flex items-center justify-between mb-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={soundEnabled ? 'Silenciar sonidos de respiración' : 'Activar sonidos de respiración'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> : <VolumeX className="w-5 h-5" />}
          </button>

          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Ciclo {cycle} de {totalCycles}
          </span>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Cerrar modal de respiración"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
          Respiración Consciente 4-4-6
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-xs">
          Regula el sistema nervioso y reduce la reactividad del cuerpo.
        </p>

        {/* Breathing Circle Area */}
        <div className="relative w-64 h-64 flex items-center justify-center my-4">
          {/* Animated pulsing orb */}
          <div
            className={`w-48 h-48 rounded-full border-4 flex flex-col items-center justify-center shadow-lg transition-transform ease-in-out ${
              isActive ? current.scaleClass : 'scale-100'
            } ${current.bgGlow}`}
          >
            <span className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tabular-nums">
              {secondsLeft}s
            </span>
            <span className={`text-xs font-bold uppercase tracking-wider mt-1 ${current.color}`}>
              {phase === 'inhale' ? 'Inhala' : phase === 'hold' ? 'Retén' : 'Exhala'}
            </span>
          </div>
        </div>

        {/* Status text */}
        <p className={`font-semibold text-sm mb-6 ${current.color}`}>
          {current.text}
        </p>

        {/* Control Buttons */}
        <div className="flex items-center gap-3 w-full">
          <button
            onClick={handleReset}
            className="p-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            aria-label="Reiniciar respiración"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {!isActive ? (
            <button
              onClick={handleStart}
              className="flex-1 py-3 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm uppercase tracking-wider border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>{cycle === 1 && secondsLeft === 4 ? 'Comenzar respiración' : 'Continuar'}</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="flex-1 py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm uppercase tracking-wider border-b-4 border-amber-700 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Pause className="w-5 h-5 fill-white" />
              <span>Pausar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
