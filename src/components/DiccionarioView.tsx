import React, { useState, useMemo } from 'react';
import { SymptomCategory, SymptomEntry, UserProfile } from '../types';
import { symptomCategories, symptomsDictionary } from '../data/symptomsDictionary';
import {
  Search,
  BookOpen,
  Volume2,
  Heart,
  Bookmark,
  BookmarkCheck,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';
import { speakSpanishText, stopSpanishSpeech, playDuolingoSuccessChime } from '../utils/audio';

interface DiccionarioViewProps {
  initialQuery?: string;
  user: UserProfile;
  onToggleSaveSymptom: (symptomId: string) => void;
  onOpenSymptomDetail: (symptom: SymptomEntry) => void;
}

export const DiccionarioView: React.FC<DiccionarioViewProps> = ({
  initialQuery = '',
  user,
  onToggleSaveSymptom,
  onOpenSymptomDetail
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSpeakingId, setActiveSpeakingId] = useState<string | null>(null);

  // Filter symptoms based on search and category
  const filteredSymptoms = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return symptomsDictionary.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.emotionAndConflict.toLowerCase().includes(query) ||
        item.organsAffected.toLowerCase().includes(query) ||
        item.healingMessage.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const handleSpeak = (item: SymptomEntry) => {
    if (activeSpeakingId === item.id) {
      stopSpanishSpeech();
      setActiveSpeakingId(null);
    } else {
      setActiveSpeakingId(item.id);
      const text = `${item.name}. Raíz emocional: ${item.emotionAndConflict}. Mensaje sanador: ${item.healingMessage}`;
      speakSpanishText(
        text,
        () => setActiveSpeakingId(null),
        () => setActiveSpeakingId(item.id)
      );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Search */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 md:p-6 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            <span>Biodecodificación & Sabiduría Corporal</span>
            <span>·</span>
            <span className="text-emerald-700 dark:text-emerald-400">{symptomsDictionary.length} Entradas</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Diccionario Emocional de Síntomas
          </h2>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Explora qué conflicto o emoción puede estar expresando tu cuerpo para acompañarlo con amor.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Escribe un síntoma, órgano o emoción (ej. migraña, estómago, culpa, garganta, espalda...)"
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:outline-none text-slate-900 dark:text-slate-100 font-medium placeholder:text-slate-400 text-sm bg-slate-50/50 dark:bg-slate-800"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              Borrar
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Todos ({symptomsDictionary.length})
          </button>
          {symptomCategories.map((cat) => {
            const count = symptomsDictionary.filter((s) => s.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Symptoms Grid */}
      {filteredSymptoms.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border-2 border-slate-200 dark:border-slate-800 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base mb-1">
            No encontramos entradas con "{searchQuery}"
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
            Prueba buscando por una palabra más general como "cabeza", "pecho", "dolor", "miedo" o "piel".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="py-2.5 px-4 rounded-xl bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider"
          >
            Ver todas las entradas
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSymptoms.map((symptom) => {
            const isSaved = user.savedSymptoms.includes(symptom.id);
            return (
              <div
                key={symptom.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 border-2 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                      {symptom.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleSpeak(symptom)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          activeSpeakingId === symptom.id
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                            : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                        }`}
                        title="Escuchar con voz"
                        aria-label="Escuchar síntoma con voz"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onToggleSaveSymptom(symptom.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isSaved
                            ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                            : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                        }`}
                        title={isSaved ? 'Guardado en mis síntomas' : 'Guardar síntoma'}
                        aria-label={isSaved ? 'Quitar de mis síntomas guardados' : 'Guardar en mis síntomas'}
                      >
                        {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {symptom.name}
                  </h3>

                  <div className="bg-slate-50 dark:bg-slate-800/70 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 mb-3">
                    <span className="block text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400 mb-0.5">
                      Conflicto y raíz emocional:
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {symptom.emotionAndConflict}
                    </p>
                  </div>

                  <div className="bg-emerald-50/60 dark:bg-emerald-950/40 p-3 rounded-2xl border border-emerald-100 dark:border-emerald-800/60">
                    <span className="block text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-0.5">
                      Mensaje sanador:
                    </span>
                    <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      {symptom.healingMessage}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {symptom.inquiryQuestions.length} preguntas de autoindagación
                  </span>
                  <button
                    onClick={() => onOpenSymptomDetail(symptom)}
                    className="py-1.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors flex items-center gap-1"
                  >
                    <span>Ver en profundidad</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
