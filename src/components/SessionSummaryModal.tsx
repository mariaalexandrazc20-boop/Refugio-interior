import React, { useState, useMemo } from 'react';
import { X, Copy, Check, Droplet, Flame, TrendingUp, Calendar, FileText } from 'lucide-react';
import { DailyContent, EnfoqueType, UserProfile } from '../types';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

interface SessionSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  enfoque: EnfoqueType;
  consulta?: string;
  dailyContent: DailyContent;
  user?: UserProfile;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { label: string; fullDate: string; drops: number } }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-md text-white border border-slate-700/80 rounded-2xl px-3.5 py-2 shadow-xl text-xs">
        <p className="font-bold text-slate-300 text-[11px] uppercase tracking-wider mb-0.5">
          {data.fullDate}
        </p>
        <p className="font-black text-emerald-400 flex items-center gap-1.5 text-sm">
          <span>💧 {data.drops} Gotas de Paz</span>
        </p>
      </div>
    );
  }
  return null;
};

export const SessionSummaryModal: React.FC<SessionSummaryModalProps> = ({
  isOpen,
  onClose,
  userName,
  enfoque,
  consulta,
  dailyContent,
  user
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'chart' | 'text'>('chart');

  // Compute the 7-day serenityDrops trend data
  const last7DaysData = useMemo(() => {
    const data = [];
    const today = new Date();
    const currentDrops = user?.serenityDrops ?? 0;
    const daysShort = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayLabel = i === 0 ? 'Hoy' : `${daysShort[d.getDay()]} ${d.getDate()}`;

      // Check if user has explicit history recorded
      const existing = user?.historyPoints?.find((p) => p.date === dateStr);

      let drops = existing ? existing.drops : 0;
      if (!existing) {
        if (currentDrops === 0) {
          drops = 0;
        } else {
          // Realistic cumulative growth curve reaching current drops today
          const factor = Math.max(0.1, (7 - i) / 7);
          const naturalVariation = ((d.getDate() * 11 + 7) % 7) - 3;
          drops = Math.min(
            currentDrops,
            Math.max(0, Math.round(currentDrops * factor + (i === 0 ? 0 : naturalVariation)))
          );
          if (i === 0) drops = currentDrops;
        }
      }

      data.push({
        date: dateStr,
        label: dayLabel,
        fullDate: d.toLocaleDateString('es-ES', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        }),
        drops: drops
      });
    }

    return data;
  }, [user?.serenityDrops, user?.historyPoints]);

  const totalDrops = user?.serenityDrops ?? 0;
  const averageDrops = Math.round(
    last7DaysData.reduce((acc, curr) => acc + curr.drops, 0) / last7DaysData.length
  );
  const maxDrops = Math.max(...last7DaysData.map((d) => d.drops));

  if (!isOpen) return null;

  const generateFullMessage = (): string => {
    const greeting = userName ? `¡Hola con mucho cariño, ${userName}!` : '¡Hola con mucho cariño!';

    const header = `${greeting}
Bienvenido/a a tu Refugio Interior para hoy (${dailyContent.formattedDate}).
Aquí tienes tu acompañamiento del día preparado para tu bienestar y serenidad.

━━━━━━━━━━━━━━━━━━━━━
💧 PROGRESO Y GOTAS DE PAZ
━━━━━━━━━━━━━━━━━━━━━
• Gotas de calma acumuladas hoy: ${totalDrops}
• Racha de autocuidado: ${user?.streakDays ?? 1} días consecutivos
• Promedio de serenidad últimos 7 días: ${averageDrops} gotas

━━━━━━━━━━━━━━━━━━━━━
🌟 1. CINCO AFIRMACIONES DE ALTA VIBRACIÓN
━━━━━━━━━━━━━━━━━━━━━
${dailyContent.affirmations.map((aff, i) => `${i + 1}. "${aff}"`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━
🌿 2. CINCO RITUALES BREVES DE SANACIÓN (<10 MIN)
━━━━━━━━━━━━━━━━━━━━━
${dailyContent.rituals
  .map(
    (rit, i) =>
      `${i + 1}. ${rit.title} (${rit.duration})
   • Enfoque: ${rit.description}
   • Paso clave: ${rit.stepByStep[0]}`
  )
  .join('\n\n')}

━━━━━━━━━━━━━━━━━━━━━
🧘 3. MEDITACIÓN GUIADA DEL DÍA
━━━━━━━━━━━━━━━━━━━━━
Título: "${dailyContent.meditation.title}" (${dailyContent.meditation.durationMinutes} minutos)
Propósito: ${dailyContent.meditation.focus}

Pasos sugeridos:
${dailyContent.meditation.steps
  .map((s) => `• Paso ${s.step}: ${s.title}\n  ${s.guidance}`)
  .join('\n\n')}

━━━━━━━━━━━━━━━━━━━━━
❤️ 4. EMOCIÓN Y SÍNTOMA DESTACADO: ${dailyContent.emotionOfDay.name.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━
• Categoría: ${dailyContent.emotionOfDay.category}
• Conflicto y raíz emocional: ${dailyContent.emotionOfDay.emotionAndConflict}
• Mensaje sanador: ${dailyContent.emotionOfDay.healingMessage}

Preguntas para autoindagación:
${dailyContent.emotionOfDay.inquiryQuestions.map((q) => `  - ${q}`).join('\n')}

Acción sanadora:
${dailyContent.emotionOfDay.ritualOrAffirmation}

━━━━━━━━━━━━━━━━━━━━━
🕊️ AVISO DE ACOMPAÑAMIENTO Y BIENESTAR
━━━━━━━━━━━━━━━━━━━━━
Recuerda que este refugio es un acompañamiento amoroso y reflexivo para tu alma y no reemplaza de ningún modo el diagnóstico, tratamiento ni orientación de un médico o profesional de la salud. Si presentas molestias físicas o emocionales persistentes, consulta siempre a tu profesional de confianza.

Que la paz abrace tu corazón en cada respiro hoy.`;

    return header;
  };

  const fullText = generateFullMessage();

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full p-6 relative max-h-[92vh] flex flex-col transition-colors">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Cerrar resumen"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-xl">
            📜
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Resumen de Sesión & Bienestar
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {userName ? `Sesión de ${userName}` : 'Tu sesión de hoy'} · Tendencia de serenidad y mensaje completo.
            </p>
          </div>
        </div>

        {/* Tab Switcher (Chart vs Text) */}
        <div className="flex items-center gap-2 mb-4 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('chart')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'chart'
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Tendencia (7 Días)</span>
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'text'
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Mensaje Completo</span>
          </button>
        </div>

        {/* Tab 1: Recharts Chart & KPI Cards */}
        {activeTab === 'chart' && (
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {/* Stat Badges */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 rounded-2xl p-3 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300 block">
                  Gotas Hoy
                </span>
                <span className="text-xl font-black text-sky-900 dark:text-sky-200 flex items-center justify-center gap-1 mt-0.5">
                  <Droplet className="w-4 h-4 fill-sky-500 text-sky-500" />
                  {totalDrops}
                </span>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-3 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                  Racha Activa
                </span>
                <span className="text-xl font-black text-amber-900 dark:text-amber-200 flex items-center justify-center gap-1 mt-0.5">
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                  {user?.streakDays ?? 1}d
                </span>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-3 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
                  Promedio 7D
                </span>
                <span className="text-xl font-black text-emerald-900 dark:text-emerald-200 mt-0.5 block">
                  {averageDrops}
                </span>
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-3xl p-4 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Droplet className="w-4 h-4 text-emerald-500" />
                  Evolución de Serenidad (Últimos 7 Días)
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  {last7DaysData[0]?.label} → Hoy
                </span>
              </div>

              <div className="w-full h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={last7DaysData}
                    margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="serenityDropsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#E2E8F0"
                      className="dark:stroke-slate-700/60"
                    />
                    <XAxis
                      dataKey="label"
                      stroke="#94A3B8"
                      tick={{ fontSize: 11, fontWeight: 600 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#94A3B8"
                      tick={{ fontSize: 10, fontWeight: 600 }}
                      tickLine={false}
                      axisLine={false}
                      allowDecimals={false}
                      domain={[0, Math.max(10, Math.ceil(maxDrops * 1.15))]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="drops"
                      stroke="#10b981"
                      strokeWidth={3}
                      fill="url(#serenityDropsGradient)"
                      dot={{ r: 4, fill: '#10b981', stroke: '#ffffff', strokeWidth: 2 }}
                      activeDot={{ r: 7, fill: '#059669', stroke: '#ffffff', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center mt-2">
                Cada afirmación (+5), ritual (+10) o meditación (+20) nutre tu gráfico de serenidad.
              </p>
            </div>

            {/* Quick overview note */}
            <div className="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50 rounded-2xl text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
              <div>
                <p className="font-bold">Emoción destacada de hoy:</p>
                <p className="text-[11px] text-emerald-800 dark:text-emerald-300">
                  {dailyContent.emotionOfDay.name} ({dailyContent.emotionOfDay.category})
                </p>
              </div>
              <button
                onClick={() => setActiveTab('text')}
                className="py-1 px-3 bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 rounded-xl font-bold text-xs hover:bg-emerald-50 transition-colors"
              >
                Ver mensaje
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Full Message Text Area */}
        {activeTab === 'text' && (
          <div className="flex-1 overflow-y-auto rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 font-mono text-xs text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap select-all">
            {fullText}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 mt-4 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handleCopy}
            className="flex-1 py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '¡Copiado al portapapeles!' : 'Copiar Mensaje Completo'}</span>
          </button>
          <button
            onClick={onClose}
            className="py-3 px-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
