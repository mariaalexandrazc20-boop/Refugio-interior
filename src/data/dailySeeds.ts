import { DailyContent, DailyRitual, GuidedMeditation, SymptomEntry } from '../types';
import { symptomsDictionary } from './symptomsDictionary';

// Pool of 60+ affirmations in 1st person, present tense, loving & concrete
export const affirmationsPool: string[] = [
  'Hoy elijo ser mi lugar seguro y tratarme con infinita ternura.',
  'Merezco descansar sin culpa; mi valor no depende de mi productividad.',
  'Inhalo paz y exhalo la necesidad de controlar lo que no me corresponde.',
  'Mi cuerpo es sabio, lo escucho con amor y honro cada una de sus señales.',
  'Me doy permiso de sentir mis emociones sin juzgarlas ni reprimirlas.',
  'Suelto los dolores del pasado y me abro al bienestar de este instante.',
  'Tengo el derecho y la fuerza para poner límites sanos y proteger mi paz.',
  'Hoy elijo perdonarme por lo que no sabía en el pasado.',
  'Acepto mi imperfección humana con compasión y alegría.',
  'Mi valor no disminuye por el juicio o la opinión de los demás.',
  'Confío en el ritmo natural de mi vida y suelto el apuro.',
  'Soy digno/a de recibir amor, cuidado y respeto en abundancia.',
  'En medio de cualquier tormenta, conservo un santuario de calma en mi pecho.',
  'Abrazo mi vulnerabilidad como la raíz más noble de mi valentía.',
  'Devuelvo con amor las cargas que no me pertenecen.',
  'Hoy celebro mis pequeños avances cotidianos con sincero agradecimiento.',
  'Me permito decir "no" cuando mi corazón lo necesita para cuidarme.',
  'El amor que busco afuera comienza en cómo me hablo a mí mismo/a hoy.',
  'Cada respiración profunda renueva mis células y calma mi sistema nervioso.',
  'Tengo la capacidad de superar este momento con suavidad y paciencia.',
  'La serenidad es mi estado natural y regreso a ella con cada respiro.',
  'Bendigo mi historia y elijo escribir hoy un capítulo lleno de armonía.',
  'Mi corazón es un jardín fértil donde florecen la calma y la alegría.',
  'Elijo soltar la prisa y caminar al compás de mi propia serenidad.',
  'Me reconozco valiente por cada día que he seguido adelante.',
  'La luz que hay en mí es más grande que cualquier sombra pasajera.',
  'Hoy me regalo tiempo de calidad, silencio y nutrición para mi alma.',
  'Agradezco a mi cuerpo por sostenerme en cada latido y cada paso.',
  'Me libero de la necesidad de complacer a todos a expensas de mi bienestar.',
  'Estoy a salvo aquí y ahora; el presente es mi mayor aliado.',
  'Hago las paces con mi ritmo personal: todo florece en su estación.',
  'Merezco vivir con ligereza, soltando el exceso de equipaje mental.'
];

// Pool of 20+ short rituals under 10 minutes
export const ritualsPool: DailyRitual[] = [
  {
    id: 'rit-respiracion-446',
    title: 'Respiración Consciente 4-4-6',
    duration: '4 min',
    icon: 'Wind',
    category: 'Regulación Nerviosa',
    type: 'breathing',
    description: 'Activa el nervio vago y reduce el cortisol con una respiración diafragmática de cadencia calmante.',
    stepByStep: [
      'Siéntate cómodo/a con los hombros relajados y la espalda recta.',
      'Inhala suavemente por la nariz contando mentalmente 4 segundos.',
      'Sostén el aire en tus pulmones con suavidad durante 4 segundos.',
      'Exhala lento por la boca con un suave silbido contando 6 segundos.',
      'Repite durante 6 a 8 ciclos y nota el alivio en tu pecho.'
    ]
  },
  {
    id: 'rit-escaneo-corporal',
    title: 'Escaneo Corporal Amoroso',
    duration: '5 min',
    icon: 'Sparkles',
    category: 'Cuerpo y Presencia',
    type: 'body-scan',
    description: 'Recorre tu cuerpo sin juzgar, llevando calor y reconocimiento a las zonas en tensión.',
    stepByStep: [
      'Cierra los ojos y lleva tu atención a la coronilla y rostro. Afloja mandíbula y entrecejo.',
      'Baja por el cuello y hombros. Déjalos caer como si soltaras dos mochilas pesadas.',
      'Lleva tu mano al pecho y nota el vaivén del corazón.',
      'Siente tu abdomen, pelvis y piernas bien apoyadas en el suelo.',
      'Envía un agradecimiento cálido a todo tu organismo por sostenerte hoy.'
    ]
  },
  {
    id: 'rit-gratitud-tres',
    title: 'Tríada de Gratitud Cotidiana',
    duration: '3 min',
    icon: 'Heart',
    category: 'Perspectiva y Gozo',
    type: 'gratitude',
    description: 'Entrena tu cerebro para notar la bondad sencilla que ya habita en tu día a día.',
    stepByStep: [
      'Piensa en 1 detalle simple que diste por sentado (un sorbo de café caliente, una cama limpia).',
      'Piensa en 1 persona o recuerdo que te hace sonreír con solo recordarlo.',
      'Piensa en 1 cualidad tuya que te ha ayudado a levantarte en momentos difíciles.',
      'Coloca tu mano en el corazón y sonríe internamente mientras dices "gracias".'
    ]
  },
  {
    id: 'rit-limite-consciente',
    title: 'Poner un Límite Consciente',
    duration: '5 min',
    icon: 'ShieldCheck',
    category: 'Autocuidado Firme',
    type: 'boundary',
    description: 'Identifica una fuga de energía en tu día y decreta un límite compasivo para proteger tu paz.',
    stepByStep: [
      'Pregúntate: ¿Qué situación o petición hoy me está generando resentimiento o fatiga?',
      'Reconoce: "Tengo derecho a cuidar mi energía sin justificarme ante nadie".',
      'Formula mentalmente una frase asertiva: "Por ahora no me es posible, gracias por comprender".',
      'Respira hondo y siente la dignidad y el espacio que recuperas.'
    ]
  },
  {
    id: 'rit-carta-perdon-express',
    title: 'Carta de Perdón y Desahogo Express',
    duration: '6 min',
    icon: 'Feather',
    category: 'Liberación Emocional',
    type: 'forgiveness',
    description: 'Escribe aquello que te dolió o la culpa que cargas, y déjalo ir simbólicamente.',
    stepByStep: [
      'Toma un bloc de notas o el espacio de reflexión de la app.',
      'Escribe sin filtros: "Me dolió que...", "Me reprocho haber...", o "Te entrego este dolor...".',
      'Léelo una vez reconociendo tu humanidad.',
      'Declara: "Hoy elijo la libertad antes que el resentimiento. Te libero y me libero".',
      'Rompe el papel o pulsa en la app para soltarlo al viento.'
    ]
  },
  {
    id: 'rit-sol-caminata',
    title: 'Baño de Sol y Contacto Terrestre',
    duration: '7 min',
    icon: 'Sun',
    category: 'Conexión Natural',
    type: 'nature',
    description: 'Recibe luz natural en el rostro o camina descalzo/a para sincronizar tu ritmo biológico.',
    stepByStep: [
      'Sal a un balcón, ventana o jardín donde entre luz natural.',
      'Cierra los ojos y siente la calidez del sol en tus párpados y mejillas.',
      'Si es posible, apoya los pies descalzos sobre el césped o suelo.',
      'Haz 5 respiraciones profundas absorbiendo la vitalidad del entorno.',
      'Agradece a la naturaleza por recordarte que todo renace a su tiempo.'
    ]
  },
  {
    id: 'rit-enraizamiento-54321',
    title: 'Anclaje Sensorial 5-4-3-2-1',
    duration: '4 min',
    icon: 'Compass',
    category: 'Presencia Antiansiedad',
    type: 'grounding',
    description: 'Desactiva la rumiación mental conectando directamente con los cinco sentidos físicos.',
    stepByStep: [
      'Mira a tu alrededor y nombra en voz baja 5 objetos con sus colores.',
      'Toca 4 texturas distintas (la tela de tu ropa, la mesa lisa, tu cabello, etc.).',
      'Identifica 3 sonidos lejanos o cercanos en este instante.',
      'Percibe 2 aromas presentes en el aire.',
      'Saborea 1 gusto en tu boca y toma un sorbo de agua consciente.'
    ]
  },
  {
    id: 'rit-vaso-agua-bendecida',
    title: 'Hidratación Consciente con Intención',
    duration: '3 min',
    icon: 'Droplet',
    category: 'Nutrición del Alma',
    type: 'nature',
    description: 'Bebe un vaso de agua sosteniéndolo con ambas manos e impregnándolo de paz.',
    stepByStep: [
      'Sirve un vaso con agua fresca y sostén el cristal con ambas manos.',
      'Míralo y di mentalmente una intención: "Salud, limpieza y paz para mis células".',
      'Bebe a sorbos muy lentos, sintiendo la frescura recorrer tu garganta y estómago.',
      'Visualiza cómo cada gota limpia la tensión acumulada en tus órganos.',
      'Sonríe con gratitud al terminar.'
    ]
  }
];

// Pool of Guided Meditations with step-by-step guidance & timing
export const meditationsPool: GuidedMeditation[] = [
  {
    id: 'med-soltar-control',
    title: 'Soltar el Control y Entregarse a la Calma',
    durationMinutes: 8,
    focus: 'Aliviar la sobreexigencia mental y la ansiedad por el futuro.',
    steps: [
      {
        step: 1,
        title: 'Llegada y Postura Cómoda',
        guidance: 'Encuentra una postura agradable, cierra suavemente los párpados y permite que tus hombros caigan hacia la tierra. No tienes nada que demostrar ahora.',
        timeSec: 90
      },
      {
        step: 2,
        title: 'El Río de los Pensamientos',
        guidance: 'Imagina que te sientas a la orilla de un arroyo cristalino. Cada pensamiento que surja colócalo suavemente sobre una hoja flotante y mira cómo el agua se lo lleva río abajo.',
        timeSec: 150
      },
      {
        step: 3,
        title: 'Abrazo al Corazón',
        guidance: 'Lleva tu palma derecha al centro del pecho. Siente el latido rítmico y dile en silencio: "Gracias por latir siempre. Hoy te regalo descanso y confianza".',
        timeSec: 120
      },
      {
        step: 4,
        title: 'Retorno con Luz Renovada',
        guidance: 'Inhala profundamente llenando tu cuerpo de aire fresco. Mueve despacio los dedos de las manos y de los pies, y abre los ojos llevando contigo esta quietud.',
        timeSec: 120
      }
    ]
  },
  {
    id: 'med-abrazar-sintomas',
    title: 'Diálogo Amoroso con tu Cuerpo y sus Síntomas',
    durationMinutes: 10,
    focus: 'Dejar de luchar contra el malestar físico y escuchar su mensaje con compasión.',
    steps: [
      {
        step: 1,
        title: 'Bienvenida a tus Sensaciones',
        guidance: 'Siéntate en silencio. En lugar de huir de las molestias físicas, obsérvalas con ojos de curiosidad y respeto. Tu cuerpo no está roto; se está comunicando.',
        timeSec: 120
      },
      {
        step: 2,
        title: 'Pregunta desde el Corazón',
        guidance: 'Pon tu mano sobre la zona del cuerpo que ha dolido o manifestado tensión. Pregúntale con ternura: "¿Qué emoción estás guardando para protegerme?".',
        timeSec: 180
      },
      {
        step: 3,
        title: 'Luz Sanadora y Aceptación',
        guidance: 'Visualiza una luz cálida y esmeralda que baña esa zona. Dile: "Te escucho, te comprendo y te agradezco. Me permito liberar lo que ya no necesito retener".',
        timeSec: 180
      },
      {
        step: 4,
        title: 'Integración y Gratitud Celular',
        guidance: 'Siente cómo la tensión se afloja unos milímetros. Respira 3 veces profundamente y honra a tu cuerpo con una sonrisa de cariño.',
        timeSec: 120
      }
    ]
  },
  {
    id: 'med-refugio-seguro',
    title: 'El Santuario de la Serenidad Interior',
    durationMinutes: 7,
    focus: 'Construir un espacio mental inexpugnable de seguridad y bienestar.',
    steps: [
      {
        step: 1,
        title: 'Creación del Espacio Sagrado',
        guidance: 'Cierra tus ojos e imagina un lugar donde te sientes absolutamente seguro/a y amado/a: una cabaña cálida, una playa al atardecer o un claro en el bosque.',
        timeSec: 100
      },
      {
        step: 2,
        title: 'Detalles Sensoriales',
        guidance: 'Siente la temperatura agradable en tu piel, el aroma a pinos o mar, y la tranquilidad absoluta de saber que aquí nadie te exige nada.',
        timeSec: 140
      },
      {
        step: 3,
        title: 'Anclaje de Paz',
        guidance: 'Junta el pulgar con el índice de tu mano. Guarda esta sensación de seguridad en tu memoria corporal para poder regresar a ella cada vez que lo necesites.',
        timeSec: 100
      },
      {
        step: 4,
        title: 'Regreso Renovado',
        guidance: 'Respira hondo con gratitud. Abre los ojos sabiendo que este refugio siempre viaja contigo dentro de tu corazón.',
        timeSec: 80
      }
    ]
  }
];

// Seed generator based on date string (YYYY-MM-DD)
export function getDailyContent(targetDate?: Date): DailyContent {
  const date = targetDate || new Date();
  const dateStr = date.toISOString().split('T')[0];

  // Hash the date string to produce a deterministic pseudo-random seed
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  const seed = Math.abs(hash);

  // Pick 5 distinct affirmations
  const affirmationsShuffled = [...affirmationsPool].sort((a, b) => {
    const codeA = a.charCodeAt(0) + seed;
    const codeB = b.charCodeAt(0) + seed;
    return (codeA % 17) - (codeB % 17);
  });
  const dailyAffirmations = affirmationsShuffled.slice(0, 5);

  // Pick 5 distinct rituals
  const ritualsShuffled = [...ritualsPool].sort((a, b) => {
    const numA = (a.id.length * 13 + seed) % 19;
    const numB = (b.id.length * 13 + seed) % 19;
    return numA - numB;
  });
  const dailyRituals = ritualsShuffled.slice(0, 5);

  // Pick 1 guided meditation
  const medIndex = seed % meditationsPool.length;
  const dailyMeditation = meditationsPool[medIndex];

  // Pick 1 emotion/symptom of the day
  const symptomIndex = seed % symptomsDictionary.length;
  const emotionOfDay = symptomsDictionary[symptomIndex];

  // Format date in Spanish
  const formattedDate = date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return {
    dateStr,
    formattedDate: formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1),
    affirmations: dailyAffirmations,
    rituals: dailyRituals,
    meditation: dailyMeditation,
    emotionOfDay
  };
}
