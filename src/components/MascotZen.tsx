import React from 'react';
import { motion } from 'motion/react';

interface MascotZenProps {
  mood?: 'welcoming' | 'calm' | 'celebrating' | 'meditating' | 'encouraging';
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  userName?: string;
}

export const MascotZen: React.FC<MascotZenProps> = ({
  mood = 'welcoming',
  message,
  size = 'md',
  userName
}) => {
  const defaultMessages: Record<string, string> = {
    welcoming: userName ? `¡Hola ${userName}! Tu refugio interior te da la bienvenida hoy.` : '¡Bienvenido a tu Refugio Interior! Escribe tu nombre para comenzar.',
    calm: 'Inhala suavemente... todo está bien en este instante.',
    celebrating: '¡Excelente! Has sumado paz y serenidad a tu día.',
    meditating: 'Cierra los ojos un momento y escucha tu respiración.',
    encouraging: 'Un paso pequeño cada día sana grandes heridas.'
  };

  const bubbleText = message || defaultMessages[mood];

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-28 h-28'
  };

  return (
    <div className="flex items-center gap-3">
      {/* Mascot SVG Character */}
      <motion.div
        animate={
          mood === 'celebrating'
            ? { y: [0, -8, 0, -6, 0], rotate: [0, -4, 4, 0] }
            : mood === 'meditating'
            ? { scale: [1, 1.04, 1], y: [0, -2, 0] }
            : { y: [0, -4, 0] }
        }
        transition={{
          repeat: Infinity,
          duration: mood === 'meditating' ? 4 : mood === 'celebrating' ? 1.5 : 3,
          ease: 'easeInOut'
        }}
        className={`relative shrink-0 ${sizeClasses[size]}`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-md select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Soft outer glow */}
          <circle cx="50" cy="50" r="46" fill="#DCFCE7" className="dark:fill-emerald-950/60" />

          {/* Cute Body (Soft Duolingo Sage/Emerald Green) */}
          <rect
            x="20"
            y="26"
            width="60"
            height="58"
            rx="28"
            fill="#22C55E"
          />

          {/* Belly patch */}
          <ellipse cx="50" cy="62" rx="20" ry="17" fill="#86EFAC" />

          {/* Cheeks */}
          <ellipse cx="32" cy="55" rx="5" ry="3.5" fill="#F87171" opacity="0.65" />
          <ellipse cx="68" cy="55" rx="5" ry="3.5" fill="#F87171" opacity="0.65" />

          {/* Eyes according to mood */}
          {mood === 'meditating' || mood === 'calm' ? (
            // Peaceful curved closed eyes
            <>
              <path
                d="M32 46 Q38 52 44 46"
                stroke="#14532D"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M56 46 Q62 52 68 46"
                stroke="#14532D"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : mood === 'celebrating' ? (
            // Excited arched joyful eyes
            <>
              <path
                d="M32 48 Q38 41 44 48"
                stroke="#14532D"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M56 48 Q62 41 68 48"
                stroke="#14532D"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : (
            // Big friendly Duolingo-style shiny eyes
            <>
              <ellipse cx="38" cy="46" rx="5" ry="6.5" fill="#14532D" />
              <circle cx="40" cy="44" r="2" fill="#FFFFFF" />
              <ellipse cx="62" cy="46" rx="5" ry="6.5" fill="#14532D" />
              <circle cx="64" cy="44" r="2" fill="#FFFFFF" />
            </>
          )}

          {/* Peace bird wings */}
          <ellipse cx="20" cy="56" rx="7" ry="12" fill="#16A34A" transform="rotate(-15 20 56)" />
          <ellipse cx="80" cy="56" rx="7" ry="12" fill="#16A34A" transform="rotate(15 80 56)" />

          {/* Cute beak */}
          <polygon points="50,50 45,56 55,56" fill="#FBBF24" />

          {/* Gentle peace flower / sprout on head */}
          <path
            d="M50 26 C46 18 52 12 56 16 C58 20 54 24 50 26 Z"
            fill="#16A34A"
          />
          <circle cx="56" cy="15" r="2.5" fill="#FCD34D" />
        </svg>

        {/* Small floating zen sparkles for celebrating mood */}
        {mood === 'celebrating' && (
          <span className="absolute -top-1 -right-1 text-xs animate-bounce">✨</span>
        )}
      </motion.div>

      {/* Speech Bubble with Dark Mode support */}
      {bubbleText && (
        <div className="relative bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-2.5 shadow-sm max-w-xs md:max-w-md transition-colors">
          {/* Arrow pointing to mascot */}
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-r-8 border-r-slate-200 dark:border-r-slate-700 border-b-6 border-b-transparent" />
          <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-0 h-0 border-t-5 border-t-transparent border-r-7 border-r-white dark:border-r-slate-800 border-b-5 border-b-transparent" />
          <p className="text-sm font-medium text-slate-800 dark:text-slate-100 leading-snug">
            {bubbleText}
          </p>
        </div>
      )}
    </div>
  );
};
