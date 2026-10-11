export type EnfoqueType = 'rutina' | 'diccionario' | 'meditacion' | 'afirmaciones';

export interface UserProfile {
  id: string;
  name: string;
  avatar: string; // emoji or avatar identifier
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  serenityDrops: number; // Duolingo-style calmness points / gemas
  completedRitualsToday: string[];
  completedAffirmationsToday: string[];
  meditationCompletedToday: boolean;
  savedSymptoms: string[];
  notes: {
    id: string;
    date: string;
    topic: string;
    content: string;
    emotion?: string;
  }[];
  historyPoints?: {
    date: string;
    drops: number;
  }[];
}

export interface SymptomEntry {
  id: string;
  name: string;
  category: SymptomCategory;
  organsAffected: string;
  emotionAndConflict: string;
  healingMessage: string;
  inquiryQuestions: string[];
  ritualOrAffirmation: string;
}

export type SymptomCategory =
  | 'Cabeza y Sistema Nervioso'
  | 'Garganta, Voz y Expresión'
  | 'Pecho, Pulmones y Corazón'
  | 'Sistema Digestivo'
  | 'Espalda, Huesos y Articulaciones'
  | 'Piel y Sentidos'
  | 'Emociones y Conflictos Directos';

export interface DailyRitual {
  id: string;
  title: string;
  duration: string; // e.g. "3 min"
  icon: string;
  category: string;
  description: string;
  stepByStep: string[];
  type?: 'breathing' | 'body-scan' | 'gratitude' | 'boundary' | 'forgiveness' | 'nature' | 'grounding';
}

export interface MeditationStep {
  step: number;
  title: string;
  guidance: string;
  timeSec: number;
}

export interface GuidedMeditation {
  id: string;
  title: string;
  durationMinutes: number;
  focus: string;
  steps: MeditationStep[];
}

export interface DailyContent {
  dateStr: string;
  formattedDate: string;
  affirmations: string[];
  rituals: DailyRitual[];
  meditation: GuidedMeditation;
  emotionOfDay: SymptomEntry;
}

export interface SessionRecord {
  timestamp: string;
  userName: string;
  enfoque: EnfoqueType;
  consulta?: string;
  emocionDestacada: string;
  afirmacionesEntregadas: string[];
  ritualesEntregados: string[];
  meditacionEntregada: string;
}
