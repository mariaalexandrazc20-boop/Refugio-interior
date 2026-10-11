import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

export const MedicalDisclaimerBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/90 dark:border-amber-800/60 rounded-2xl p-3.5 text-xs text-amber-900 dark:text-amber-200 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900 dark:text-amber-200 leading-snug">
              Acompañamiento emocional compasivo
            </p>
            <p className="text-amber-800/90 dark:text-amber-300/90 mt-0.5 leading-relaxed">
              Refugio Interior ofrece reflexión y bienestar emocional. No sustituye la consulta, diagnóstico ni tratamiento médico o psicológico profesional.
            </p>
            {isExpanded && (
              <div className="mt-2.5 pt-2 border-t border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 space-y-1 text-[11px] leading-relaxed">
                <p>
                  • Si experimentas síntomas físicos persistentes o intensos, acude siempre a un médico cualificado.
                </p>
                <p>
                  • Nunca suspendas, modifiques ni reemplaces ningún tratamiento clínico o farmacológico recetado.
                </p>
                <p>
                  • En caso de crisis emocional o emergencia médica, contacta de inmediato a las líneas de ayuda de tu país o a urgencias.
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="shrink-0 text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 p-1 rounded-lg hover:bg-amber-100/60 dark:hover:bg-amber-900/40 transition-colors flex items-center gap-0.5 font-medium text-[11px]"
          aria-label={isExpanded ? 'Ver menos información médica' : 'Ver más información médica'}
        >
          <span>{isExpanded ? 'Menos' : 'Saber más'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
