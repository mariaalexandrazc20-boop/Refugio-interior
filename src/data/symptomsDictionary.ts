import { SymptomCategory, SymptomEntry } from '../types';

export const symptomsDictionary: SymptomEntry[] = [
  // --- CABEZA Y SISTEMA NERVIOSO ---
  {
    id: 'migrana',
    name: 'Migraña y dolor de cabeza intenso',
    category: 'Cabeza y Sistema Nervioso',
    organsAffected: 'Cerebro, vasos sanguíneos craneales',
    emotionAndConflict: 'Autoexigencia desmedida, perfeccionismo severo y necesidad de controlar el resultado. Deseo de encontrar soluciones inmediatas pensando sin parar.',
    healingMessage: 'Tu valor no depende de resolverlo todo ni de hacerlo perfecto. Puedes soltar la rienda mental y confiar en que la vida también te sostiene.',
    inquiryQuestions: [
      '¿Qué situación o persona siento que se me escapa de las manos?',
      '¿En qué área de mi vida me estoy exigiendo un estándar inalcanzable?',
      '¿Qué pasaría si hoy simplemente decido no tener todas las respuestas?'
    ],
    ritualOrAffirmation: 'Afirmación: "Bajo mis pensamientos a mi corazón. Me doy permiso de descansar, respirar y no tener que controlarlo todo hoy."'
  },
  {
    id: 'cefalea-tensional',
    name: 'Cefalea tensional (presión en la frente o sienes)',
    category: 'Cabeza y Sistema Nervioso',
    organsAffected: 'Músculos pericraneales, frente y sienes',
    emotionAndConflict: 'Sobrecarga de responsabilidades asumidas en soledad. Miedo a cometer errores o ser juzgado por no dar abasto.',
    healingMessage: 'No tienes que cargar con las expectativas ajenas sobre tu cabeza. Aliviar la presión empieza por darte un respiro a ti mismo.',
    inquiryQuestions: [
      '¿Qué pensamiento recurrente no deja descansar a mi cabeza?',
      '¿A quién siento que tengo que complacer en este momento?',
      '¿Puedo delegar o posponer una tarea sin sentirme culpable?'
    ],
    ritualOrAffirmation: 'Ritual: Masajea tus sienes con aceite tibio en círculos lentos mientras respiras en 4-4-6 durante 3 minutos.'
  },
  {
    id: 'insomnio',
    name: 'Insomnio y dificultad para conciliar el sueño',
    category: 'Cabeza y Sistema Nervioso',
    organsAffected: 'Sistema reticular activador, glándula pineal',
    emotionAndConflict: 'Dificultad para soltar el control y entregarse a la vulnerabilidad. Hipervigilancia por miedo a lo que pueda suceder mañana.',
    healingMessage: 'La noche está hecha para restaurarte, no para resolver lo que pertenece al día. Tu refugio es seguro en este instante.',
    inquiryQuestions: [
      '¿De qué peligro imaginario siente mi mente que debe protegerme despierto?',
      '¿Qué conversación pendiente no me deja descansar en paz?',
      '¿Puedo confiar en que mañana tendré la energía para lo que venga?'
    ],
    ritualOrAffirmation: 'Afirmación: "El día terminó. Cierro mis ojos con gratitud. Me entrego al descanso confiando en que todo está bien."'
  },
  {
    id: 'bruxismo',
    name: 'Bruxismo (apretar o rechinar los dientes)',
    category: 'Cabeza y Sistema Nervioso',
    organsAffected: 'Mandíbula, músculo masetero, articulación temporomandibular',
    emotionAndConflict: 'Ira o frustración contenida por no poder "morder" la situación o por no haber dicho lo que realmente pensabas para evitar conflicto.',
    healingMessage: 'Tus límites y tu voz tienen derecho a existir. No necesitas apretar la rabia hacia adentro para parecer una persona tranquila.',
    inquiryQuestions: [
      '¿Qué me enfureció recientemente y me obligué a callar con una sonrisa?',
      '¿Ante qué situación me siento impotente para cambiar el curso de las cosas?',
      '¿Cómo puedo expresar mi inconformidad de forma clara y respetuosa?'
    ],
    ritualOrAffirmation: 'Ritual: Abre suavemente la boca, saca la lengua y bosteza ampliamente 5 veces, soltando el aire con un suspiro sonoro.'
  },
  {
    id: 'mareo-vertigo',
    name: 'Mareo, vértigo o inestabilidad',
    category: 'Cabeza y Sistema Nervioso',
    organsAffected: 'Oído interno, sistema vestibular, cerebelo',
    emotionAndConflict: 'Sensación de pérdida de referencias o de piso firme. Miedo a los cambios repentinos o a no saber hacia dónde orientar la vida.',
    healingMessage: 'Cuando el mundo exterior gira rápido, tu ancla siempre está adentro. Cada paso cuenta, aunque aún no veas todo el camino.',
    inquiryQuestions: [
      '¿Qué cambio en mi entorno me genera inseguridad o miedo al futuro?',
      '¿Siento que estoy viviendo según mis propios valores o los de otros?',
      '¿Qué pequeña certeza puedo abrazar en este momento presente?'
    ],
    ritualOrAffirmation: 'Afirmación: "Pongo mis pies descalzos sobre la tierra. Estoy seguro/a, tengo raíces firmes y confío en mi propio compás."'
  },
  {
    id: 'neblina-mental',
    name: 'Neblina mental y pérdida de memoria cotidiana',
    category: 'Cabeza y Sistema Nervioso',
    organsAffected: 'Corteza prefrontal, hipocampo',
    emotionAndConflict: 'Saturación sensorial y emocional extrema. Mecanismo de defensa para desconectarse de una realidad que abruma.',
    healingMessage: 'Tu mente se nubla porque te está pidiendo un santuario de silencio. Disminuye los estímulos para que vuelva tu claridad natural.',
    inquiryQuestions: [
      '¿Cuántas decisiones estoy tratando de tomar simultáneamente?',
      '¿Qué emoción dolorosa estoy evitando sentir distrayéndome con pantallas?',
      '¿Puedo regalarme una hora de silencio sin pantallas ni tareas?'
    ],
    ritualOrAffirmation: 'Ritual: Pausa digital de 15 minutos: toma un vaso de agua despacio, mirando por una ventana sin mirar el reloj.'
  },
  {
    id: 'alopecia-caida-cabello',
    name: 'Caída de cabello acelerada o alopecia por estrés',
    category: 'Cabeza y Sistema Nervioso',
    organsAffected: 'Folículos pilosos, cuero cabelludo',
    emotionAndConflict: 'Pérdida de poder personal, sensación de desprotección o de haber sido despojado de algo valioso. Miedo al desamparo.',
    healingMessage: 'Tus raíces emocionales son profundas y se regeneran con el amor que te das. Tu fuerza no reside en la aprobación ajena.',
    inquiryQuestions: [
      '¿Qué pérdida reciente siento que me ha debilitado o dejado vulnerable?',
      '¿Siento que he perdido el control sobre mi propia imagen o destino?',
      '¿Cómo puedo nutrirme con paciencia y ternura hoy?'
    ],
    ritualOrAffirmation: 'Afirmación: "Renazco con suavidad. Mis raíces son fuertes y la vida me nutre con abundancia y ternura."'
  },

  // --- GARGANTA, VOZ Y EXPRESIÓN ---
  {
    id: 'dolor-garganta',
    name: 'Dolor o irritación de garganta recurrente',
    category: 'Garganta, Voz y Expresión',
    organsAffected: 'Faringe, laringe, cuerdas vocales',
    emotionAndConflict: 'Palabras tragadas, verdades no dichas por temor al rechazo o miedo a herir a alguien. Rabia por no poder expresarse libremente.',
    healingMessage: 'Tu voz merece espacio en el mundo. Decir tu verdad con amor no es un ataque, es tu derecho sagrado a ser quien eres.',
    inquiryQuestions: [
      '¿Qué me guardé de decir en una conversación reciente?',
      '¿A quién temo incomodar si expreso lo que verdaderamente siento?',
      '¿De qué manera puedo comunicar mis sentimientos sin herir ni apagarme?'
    ],
    ritualOrAffirmation: 'Afirmación: "Mi voz es medicina. Expreso mi verdad con suavidad, claridad y amor, y me siento en paz al hablar."'
  },
  {
    id: 'afonia-perdida-voz',
    name: 'Afonía o pérdida temporal de la voz',
    category: 'Garganta, Voz y Expresión',
    organsAffected: 'Laringe, cuerdas vocales',
    emotionAndConflict: 'Imposibilidad total o miedo paralizante de manifestar un descontento. Grito contenido o sensación de que "da igual lo que diga, nadie me escucha".',
    healingMessage: 'Cuando las cuerdas vocales se apagan, el alma pide que te escuches primero a ti mismo antes de querer convencer al mundo.',
    inquiryQuestions: [
      '¿Siento que nadie me toma en cuenta cuando hablo?',
      '¿Qué secreto o pena profunda necesita salir de mi pecho?',
      '¿Me estoy escuchando yo mismo con compasión?'
    ],
    ritualOrAffirmation: 'Ritual: Escribe en una hoja todo lo que no puedes decir en voz alta, sin filtro, y luego guárdala o bótala con alivio.'
  },
  {
    id: 'hipotiroidismo',
    name: 'Hipotiroidismo (metabolismo lento, cansancio)',
    category: 'Garganta, Voz y Expresión',
    organsAffected: 'Glándula tiroides',
    emotionAndConflict: 'Sensación de que el tiempo pasa demasiado rápido y nunca se llega a tiempo. Resignación ante la vida: "nunca podré hacer lo que realmente anhelo".',
    healingMessage: 'El tiempo no es tu enemigo. No tienes que complacer las prisas de los demás. Tu propio ritmo es perfecto y digno de respeto.',
    inquiryQuestions: [
      '¿He postergado mis verdaderos sueños por atender los deberes de otros?',
      '¿Siento que la vida va más rápido de lo que mi corazón puede procesar?',
      '¿Qué deseo genuino quiero rescatar para mí en esta etapa?'
    ],
    ritualOrAffirmation: 'Afirmación: "Honro mi ritmo vital. Me reconecto con mi entusiasmo sagrado y me doy tiempo para vivir con gozo."'
  },
  {
    id: 'hipertiroidismo',
    name: 'Hipertiroidismo (agitación, necesidad de acelerar)',
    category: 'Garganta, Voz y Expresión',
    organsAffected: 'Glándula tiroides',
    emotionAndConflict: 'Urgencia desmedida por actuar antes de que ocurra una catástrofe imaginada. Miedo a llegar tarde o a ser abandonado si no se apura.',
    healingMessage: 'Puedes detener la carrera. Ya estás a salvo aquí y ahora. No necesitas salvar a todo el mundo a costa de tu propio equilibrio.',
    inquiryQuestions: [
      '¿A qué le tengo tanto miedo si me quedo quieto/a?',
      '¿Qué creo que va a salir mal si desacelero mi velocidad?',
      '¿Puedo permitirme hoy una hora entera sin planes ni apuros?'
    ],
    ritualOrAffirmation: 'Afirmación: "Bajo las revoluciones. En este momento no hay emergencia. La calma es mi verdadero hogar."'
  },
  {
    id: 'nudo-garganta',
    name: 'Sensación de nudo en la garganta o dificultad al tragar',
    category: 'Garganta, Voz y Expresión',
    organsAffected: 'Esófago superior, musculatura faríngea',
    emotionAndConflict: 'Una pena profunda acumulada que no ha sido llorada, o una situación que resulta "difícil de tragar" o aceptar.',
    healingMessage: 'Tus lágrimas no son debilidad, son agua limpia que lava el dolor acumulado. Permite que lo atascado se disuelva en tu abrazo.',
    inquiryQuestions: [
      '¿Qué situación me niego a aceptar que ya ocurrió?',
      '¿Qué llanto he estado reprimiendo para parecer fuerte?',
      '¿Me doy permiso de llorar sin juzgarme?'
    ],
    ritualOrAffirmation: 'Ritual: Coloca una mano cálida sobre tu garganta y otra sobre el pecho. Respira profundo y date permiso de soltar cualquier suspiro.'
  },

  // --- PECHO, PULMONES Y CORAZÓN ---
  {
    id: 'opresion-pecho-ansiedad',
    name: 'Opresión en el pecho y angustia respiratoria',
    category: 'Pecho, Pulmones y Corazón',
    organsAffected: 'Músculos intercostales, diafragma, caja torácica',
    emotionAndConflict: 'Miedo al futuro, sensación de que el espacio vital es invadido o de asfixia por las exigencias externas. Dificultad para tomar la vida plenamente.',
    healingMessage: 'Hay aire suficiente para ti en el universo. Tienes derecho a ocupar tu lugar, a respirar hondo y a pedir tu propio espacio.',
    inquiryQuestions: [
      '¿Qué situación siento que me está quitando el aire o asfixiando?',
      '¿Me permito recibir el amor y la tranquilidad que otros me ofrecen?',
      '¿Estoy diciendo que sí cuando mi cuerpo grita que no?'
    ],
    ritualOrAffirmation: 'Ritual: Respiración 4-4-6: Inhala 4 segundos ensanchando las costillas, retén 4 segundos en paz, exhala 6 segundos soltando los hombros.'
  },
  {
    id: 'palpitaciones-taquicardia',
    name: 'Palpitaciones o taquicardia por inquietud',
    category: 'Pecho, Pulmones y Corazón',
    organsAffected: 'Corazón, nódulo sinusal, sistema simpático',
    emotionAndConflict: 'Alerta del corazón ante un conflicto entre lo que se siente y lo que se "debe" hacer. Miedo a no ser amado o pánico al abandono.',
    healingMessage: 'Tu corazón late para mantenerte vivo y amado. No hay peligro inminente en esta habitación. Háblale a tu pulso como a un amigo asustado.',
    inquiryQuestions: [
      '¿Qué me dice mi corazón que mi razón se niega a aceptar?',
      '¿Qué miedo me hace sentir que debo salir corriendo o defenderme?',
      '¿Puedo poner ambas manos en el pecho y repetir: "estás a salvo"?'
    ],
    ritualOrAffirmation: 'Afirmación: "Mi corazón late en sintonía con la paz. Nada me amenaza en este instante. Me sostengo con ternura."'
  },
  {
    id: 'asma-dificultad-respiratoria',
    name: 'Asma y sensación de ahogo recurrente',
    category: 'Pecho, Pulmones y Corazón',
    organsAffected: 'Bronquios, árbol respiratorio',
    emotionAndConflict: 'Sensación de invasión de la intimidad o de un amor asfixiante/posesivo. Miedo a respirar por cuenta propia y reclamar autonomía.',
    healingMessage: 'Tienes derecho a vivir tu propia vida de acuerdo a tu criterio. El aire es libre y es un regalo divino para ti sin condiciones.',
    inquiryQuestions: [
      '¿Quién en mi entorno siento que invade mis decisiones o espacio íntimo?',
      '¿Siento culpa cuando intento independizarme o poner distancia sana?',
      '¿Qué límites necesito clarificar hoy para sentir que respiro libre?'
    ],
    ritualOrAffirmation: 'Afirmación: "Tomo el aliento de la vida con plenitud. Mi espacio es sagrado y tengo libertad para respirar a mis anchas."'
  },
  {
    id: 'hipertension',
    name: 'Hipertensión arterial (tensión emocional elevada)',
    category: 'Pecho, Pulmones y Corazón',
    organsAffected: 'Arterias, corazón, sistema vascular',
    emotionAndConflict: 'Antiguo conflicto emocional no resuelto que genera presión constante interior. Necesidad de estar listo para el combate o la huida.',
    healingMessage: 'La guerra que imaginas terminó hace tiempo. Puedes bajar la guardia. La paz no es debilidad, es sabiduría de vida.',
    inquiryQuestions: [
      '¿A quién continúo juzgando o guardando rencor en silencio?',
      '¿Por qué siento que si bajo la guardia algo terrible sucederá?',
      '¿Qué herida del pasado necesita mi compasión para dejar de doler?'
    ],
    ritualOrAffirmation: 'Afirmación: "Suelto la lucha. Renuncio a querer controlar el pasado. Elijo la serenidad y la ligereza en mis venas."'
  },
  {
    id: 'tristeza-duelo-pulmon',
    name: 'Tristeza profunda y dolor sordo en el tórax',
    category: 'Pecho, Pulmones y Corazón',
    organsAffected: 'Pulmones, pleura',
    emotionAndConflict: 'Duelo no elaborado, pérdida de un ser querido, de una etapa o de un ideal. Sensación de vacío insondable en el pecho.',
    healingMessage: 'El dolor por lo perdido honra el amor que existió. No hay prisa para sanar el duelo; cada lágrima es un homenaje a tu capacidad de amar.',
    inquiryQuestions: [
      '¿Qué despedida no he terminado de pronunciar en mi corazón?',
      '¿Me culpo por haber perdido algo valioso?',
      '¿Cómo puedo honrar los recuerdos hermosos sin quedarme anclado en el dolor?'
    ],
    ritualOrAffirmation: 'Ritual: Enciende una vela imaginaria o real, respira profundo y agradece tres aprendizajes que esa experiencia o ser te dejó.'
  },

  // --- SISTEMA DIGESTIVO ---
  {
    id: 'gastritis-ardor',
    name: 'Gastritis, ardor de estómago y acidez',
    category: 'Sistema Digestivo',
    organsAffected: 'Mucosa gástrica, cardias',
    emotionAndConflict: 'Impotencia ante una situación o persona que resulta "indigerible". Rabia que arde por dentro porque sentimos que no es justo.',
    healingMessage: 'No tienes que tragarte lo que te hace daño. Lo que no puedes cambiar, déjalo ir antes de que queme tu propio templo interior.',
    inquiryQuestions: [
      '¿Qué hecho reciente me pareció una falta de respeto inaceptable?',
      '¿Qué me estoy guardando que me arde por dentro?',
      '¿Puedo aceptar que la realidad es como es, y desde ahí tomar una decisión?'
    ],
    ritualOrAffirmation: 'Afirmación: "Digiero la vida con calma y dulzura. Suelto la amargura y permito que la paz suavice mi estómago."'
  },
  {
    id: 'colon-irritable',
    name: 'Síndrome de intestino o colon irritable',
    category: 'Sistema Digestivo',
    organsAffected: 'Colon, intestino grueso',
    emotionAndConflict: 'Miedo visceral a la incertidumbre, hipercontrol y sensación de inseguridad básica. Tendencia a rumiar preocupaciones sin filtrar.',
    healingMessage: 'Tu vientre es tu segundo cerebro y siente tus temores. Dale seguridad con palabras amables. Todo problema tiene una solución paulatina.',
    inquiryQuestions: [
      '¿Qué me aterra que suceda si las cosas no salen como planeé?',
      '¿En qué situación siento que el suelo se tambalea bajo mis pies?',
      '¿Qué mensaje de cariño y estabilidad necesita escuchar mi niño interior hoy?'
    ],
    ritualOrAffirmation: 'Ritual: Coloca ambas palmas sobre tu ombligo con calor suave. Respira llenando el abdomen durante 5 minutos y susurra: "Estás seguro/a".'
  },
  {
    id: 'estrenimiento',
    name: 'Estreñimiento y dificultad para evacuar',
    category: 'Sistema Digestivo',
    organsAffected: 'Intestino grueso, recto',
    emotionAndConflict: 'Apego a lo viejo por miedo a la escasez. Dificultad para soltar rencores pasados, cosas materiales o ideas fijas por temor a quedarse sin nada.',
    healingMessage: 'La vida es un flujo constante de dar y recibir. Al vaciarte de lo que ya cumplió su ciclo, haces espacio para lo nuevo y fresco.',
    inquiryQuestions: [
      '¿A qué recuerdo, persona o rencor me estoy aferrando con terquedad?',
      '¿Tengo miedo a que el dinero o el afecto se agoten en el futuro?',
      '¿Qué puedo regalar, donar o perdonar hoy para ejercitar el desapego?'
    ],
    ritualOrAffirmation: 'Afirmación: "Suelto con gratitud lo que ya no me sirve. Confío en el flujo infinito y abundante del universo."'
  },
  {
    id: 'diarrea-estres',
    name: 'Diarrea recurrente asociada a nervios',
    category: 'Sistema Digestivo',
    organsAffected: 'Intestino delgado y grueso',
    emotionAndConflict: 'Rechazo impulsivo y repentino ante una experiencia que abruma. Deseo de huir o expulsar rápidamente la situación sin asimilarla.',
    healingMessage: 'No hay peligro letal. Puedes quedarte, mirar lo que ocurre y elegir con serenidad. Posees la capacidad de asimilar lo bueno y desechar lo demás.',
    inquiryQuestions: [
      '¿De qué compromiso o persona quiero escapar a toda prisa?',
      '¿Qué situación siento que no soy capaz de enfrentar?',
      '¿Qué parte de esta experiencia sí me aporta valor y puedo conservar?'
    ],
    ritualOrAffirmation: 'Afirmación: "Tengo aplomo y serenidad. Asimilo lo que me nutre y desecho con suavidad lo que no es mío."'
  },
  {
    id: 'reflujo-gastroesofagico',
    name: 'Reflujo gastroesofágico y regurgitación ácida',
    category: 'Sistema Digestivo',
    organsAffected: 'Esófago, esfínter esofágico inferior',
    emotionAndConflict: 'Algo que fue aceptado a la fuerza en contra de la voluntad que intenta devolverse. Resentimiento que pugna por subir a la garganta.',
    healingMessage: 'Tienes derecho a decir: "esto no es para mí". No fuerces en tu vida lo que rechaza tu intuición más profunda.',
    inquiryQuestions: [
      '¿Acepté una imposición ajena que en el fondo repruebo?',
      '¿Qué situación me deja con un mal sabor de boca constante?',
      '¿Cómo puedo renegociar mis acuerdos con honestidad?'
    ],
    ritualOrAffirmation: 'Afirmación: "Acepto sólo lo que nutre mi paz. Me rodeo de experiencias amables y me expreso con respeto."'
  },
  {
    id: 'higado-pesadez',
    name: 'Pesadez hepática o sobrecarga en la vesícula',
    category: 'Sistema Digestivo',
    organsAffected: 'Hígado, vías biliares, vesícula',
    emotionAndConflict: 'Cólera acumulada, quejas constantes y sensación de injusticia. Crítica amarga hacia los errores de otros o los propios.',
    healingMessage: 'La amargura sólo intoxica a quien la alberga. El perdón no justifica al otro, te libera a ti de seguir bebiendo el veneno.',
    inquiryQuestions: [
      '¿A quién no logro perdonarle un agravio del pasado?',
      '¿Cuánto tiempo del día dedico a quejarme mentalmente de otros?',
      '¿Qué acto de generosidad puedo tener hoy conmigo mismo?'
    ],
    ritualOrAffirmation: 'Ritual: Carta de desahogo: escribe con rabia todo lo que te indigna, léela una vez, rómpela en pedacitos pequeños y tírala al cesto.'
  },

  // --- ESPALDA, HUESOS Y ARTICULACIONES ---
  {
    id: 'dolor-lumbar-lumbago',
    name: 'Dolor lumbar y lumbago (espalda baja)',
    category: 'Espalda, Huesos y Articulaciones',
    organsAffected: 'Vértebras lumbares (L1-L5), disco intervertebral, sacro',
    emotionAndConflict: 'Inseguridad material, miedo a la carencia económica o falta de apoyo en los pilares fundamentales de la vida (familia, hogar, trabajo).',
    healingMessage: 'Tus cimientos son más firmes de lo que crees. La vida te sostiene en lo tangible. No estás solo/a en este mundo.',
    inquiryQuestions: [
      '¿Qué miedo económico o laboral no me deja caminar tranquilo/a?',
      '¿Siento que si yo no mantengo todo en pie, la familia se derrumba?',
      '¿Puedo pedir apoyo a alguien cercano sin sentir que pierdo mi valor?'
    ],
    ritualOrAffirmation: 'Afirmación: "Estoy plenamente sostenido/a por la vida. La provisión, la estabilidad y el apoyo llegan a mí con facilidad."'
  },
  {
    id: 'dolor-cervical-cuello',
    name: 'Dolor cervical, rigidez en el cuello o tortícolis',
    category: 'Espalda, Huesos y Articulaciones',
    organsAffected: 'Vértebras cervicales (C1-C7), trapecio superior',
    emotionAndConflict: 'Inflexibilidad mental, terquedad o miedo a mirar otros puntos de vista. Conflicto entre lo que piensa la cabeza y siente el cuerpo.',
    healingMessage: 'La flexibilidad es la verdadera juventud del espíritu. Mirar hacia los costados te abre puertas que no sospechabas.',
    inquiryQuestions: [
      '¿En qué asunto me he encaprichado con que las cosas sean únicamente a mi manera?',
      '¿Qué punto de vista diferente al mío me niego a escuchar?',
      '¿Cómo puedo suavizar mi postura ante el desacuerdo con otros?'
    ],
    ritualOrAffirmation: 'Ritual: Mueve suavemente la cabeza diciendo "sí" 5 veces y "no" 5 veces con extrema lentitud, agradeciendo la variedad del mundo.'
  },
  {
    id: 'hombros-cargados',
    name: 'Tensión en hombros y trapecios (peso en la espalda)',
    category: 'Espalda, Huesos y Articulaciones',
    organsAffected: 'Músculos trapecios, deltoides, cintura escapular',
    emotionAndConflict: 'Cargar con responsabilidades, problemas y emociones ajenas que no te corresponden. Sentimiento de ser el "salvador" de todos.',
    healingMessage: 'No eres responsable de la felicidad ni de las decisiones de los demás. Suelta los sacos ajenos para que ellos también crezcan.',
    inquiryQuestions: [
      '¿Qué problema que no es mío estoy intentando resolver a mis espaldas?',
      '¿A quién le estoy quitando la oportunidad de responsabilizarse de su vida?',
      '¿Qué pasaría si devuelvo amorosamente lo que no me toca cargar?'
    ],
    ritualOrAffirmation: 'Afirmación: "Bajo mis hombros. Devuelvo a cada quien su camino con amor. Sólo llevo mi propia mochila ligera y dichosa."'
  },
  {
    id: 'ciatica',
    name: 'Ciática y dolor punzante en glúteo o pierna',
    category: 'Espalda, Huesos y Articulaciones',
    organsAffected: 'Nervio ciático, zona glútea y lumbar',
    emotionAndConflict: 'Miedo al futuro financiero o temor a dar un paso decisivo hacia una nueva dirección de vida. Sensación de hipocresía forzada.',
    healingMessage: 'Cada paso que das hacia adelante te acerca a tu verdad. El temor a equivocarte se diluye cuando avanzas con honestidad.',
    inquiryQuestions: [
      '¿Qué paso importante sé que debo dar pero postergo por temor?',
      '¿Siento que estoy caminando hacia un lugar que no quiero estar?',
      '¿Qué decisión me devolvería la tranquilidad de espíritu?'
    ],
    ritualOrAffirmation: 'Afirmación: "Avanzo con confianza y firmeza. Mis pasos están guiados por la serenidad y la sabiduría."'
  },
  {
    id: 'rodillas-dolor',
    name: 'Dolor o debilidad en las rodillas',
    category: 'Espalda, Huesos y Articulaciones',
    organsAffected: 'Articulación de la rodilla, meniscos, rótula',
    emotionAndConflict: 'Conflicto de orgullo, soberbia o dificultad para doblegarse y ceder ante una autoridad o situación. Miedo a parecer débil.',
    healingMessage: 'Ceder no es perder; es adaptarse como el bambú ante el viento para no quebrarse. Tu grandeza es tu capacidad de humildad.',
    inquiryQuestions: [
      '¿Ante qué persona o situación me resisto a dar el brazo a torcer?',
      '¿Confundo pedir perdón o ser compasivo con humillarme?',
      '¿Puedo abrazar la humildad como una fuerza pacífica?'
    ],
    ritualOrAffirmation: 'Afirmación: "Me inclino con respeto ante los misterios de la vida. Soy flexible, humilde y profundamente fuerte."'
  },

  // --- PIEL Y SENTIDOS ---
  {
    id: 'dermatitis-eczema',
    name: 'Dermatitis, eczema y piel enrojecida',
    category: 'Piel y Sentidos',
    organsAffected: 'Epidermis, dermis',
    emotionAndConflict: 'Conflicto de separación dolorosa o miedo a perder el contacto afectivo. También irritación por un contacto no deseado o invasivo.',
    healingMessage: 'Tu piel es la frontera de tu templo sagrado. Puedes acariciarte con el amor que sientes que te falta del exterior.',
    inquiryQuestions: [
      '¿De quién me siento dolorosamente distanciado/a?',
      '¿Qué relación siento que me roza o irrita constantemente?',
      '¿Cómo puedo brindarme hoy una caricia, crema o autocuidado cariñoso?'
    ],
    ritualOrAffirmation: 'Ritual: Aplica crema en tus brazos con caricias lentas y amorosas, diciendo: "Te acepto, te cuido y te bendigo piel amada".'
  },
  {
    id: 'acne',
    name: 'Acné y brotes en el rostro o espalda',
    category: 'Piel y Sentidos',
    organsAffected: 'Glándulas sebáceas, folículos',
    emotionAndConflict: 'Rechazo hacia la propia imagen, miedo al juicio de los demás o vergüenza por mostrarse vulnerable tal cual uno es.',
    healingMessage: 'Eres digno de admiración y ternura exactamente como eres. No necesitas ninguna máscara para ser amado.',
    inquiryQuestions: [
      '¿Qué parte de mi aspecto o de mi personalidad me causa rechazo?',
      '¿Siento vergüenza cuando los demás me miran fijamente?',
      '¿Puedo mirarme al espejo a los ojos y sonreírme con ternura?'
    ],
    ritualOrAffirmation: 'Afirmación: "Me amo y me apruebo incondicionalmente. Muestro mi luz con orgullo y confianza sin temor al juicio."'
  },
  {
    id: 'tinnitus-zumbidos',
    name: 'Tinnitus, acúfenos o zumbidos en el oído',
    category: 'Piel y Sentidos',
    organsAffected: 'Oído interno, nervio auditivo',
    emotionAndConflict: 'Deseo de apagar el ruido mental o no querer escuchar lo que se dice alrededor. O por el contrario, miedo a escuchar la propia voz interior.',
    healingMessage: 'Detrás de todo el ruido del mundo habita un santuario de quietud infinita dentro de ti. Respira en ese centro tranquilo.',
    inquiryQuestions: [
      '¿Qué comentarios o críticas ajenas me niego a seguir escuchando?',
      '¿Le tengo miedo al silencio total porque temo encontrarme conmigo?',
      '¿Qué verdad íntima me está susurrando mi alma en voz baja?'
    ],
    ritualOrAffirmation: 'Ritual: Siéntate en silencio con las manos sobre las orejas 2 minutos sintiendo el calor, y luego canta un suave "om" o suspiro grave.'
  },
  {
    id: 'vista-cansada-ojos',
    name: 'Molestias oculares, vista cansada o irritación',
    category: 'Piel y Sentidos',
    organsAffected: 'Córnea, cristalino, nervio óptico',
    emotionAndConflict: 'Miedo a ver algo que está ocurriendo en la vida personal o familiar. Deseo inconsciente de cerrar los ojos ante una realidad dolorosa.',
    healingMessage: 'Lo que miras con ojos compasivos pierde su aspereza. Tienes la madurez para ver la realidad y transformar lo que esté en tus manos.',
    inquiryQuestions: [
      '¿Qué situación cotidiana prefiero "no mirar" para no sufrir?',
      '¿A quién o qué miro con rencor o desaprobación?',
      '¿Puedo elegir mirar mi entorno con ojos de misericordia hoy?'
    ],
    ritualOrAffirmation: 'Afirmación: "Miro al mundo con compasión y claridad. Veo la belleza oculta en cada desafío de mi camino."'
  },

  // --- EMOCIONES Y CONFLICTOS DIRECTOS ---
  {
    id: 'ansiedad-futuro',
    name: 'Ansiedad e incertidumbre ante el porvenir',
    category: 'Emociones y Conflictos Directos',
    organsAffected: 'Sistema nervioso simpático, glándulas suprarrenales',
    emotionAndConflict: 'Mente proyectada en catástrofes hipotéticas que aún no ocurren. Desconexión del único momento donde realmente existes: el presente.',
    healingMessage: 'El futuro es una fantasía de la mente; la paz vive en este respiro. En este minuto exacto, estás a salvo y tienes todo lo necesario.',
    inquiryQuestions: [
      '¿Qué tragedia hipotética estoy dando por sentada en mi cabeza?',
      '¿Qué hecho real y tangible me demuestra que ahora mismo estoy a salvo?',
      '¿Qué pequeña acción constructiva puedo hacer en los próximos 10 minutos?'
    ],
    ritualOrAffirmation: 'Ritual: Técnica 5-4-3-2-1: Nombra 5 cosas que ves, 4 que tocas, 3 que oyes, 2 que hueles y 1 que agradeces.'
  },
  {
    id: 'culpa-profunda',
    name: 'Sensación de culpa y reproche interno',
    category: 'Emociones y Conflictos Directos',
    organsAffected: 'Plexo solar, corazón',
    emotionAndConflict: 'Juzgar una decisión del pasado con la conciencia y madurez del presente. Auto-castigo inconsciente que bloquea el merecimiento.',
    healingMessage: 'Hiciste lo mejor que pudiste con las herramientas y la herida que tenías en aquel momento. La culpa inmoviliza; la responsabilidad te libera.',
    inquiryQuestions: [
      '¿Qué error del pasado sigo utilizando como látigo contra mí mismo/a?',
      '¿Perdonaría a un amigo que hubiera cometido exactamente la misma falta?',
      '¿Cómo puedo transformar ese dolor en sabiduría y reparación amorosa?'
    ],
    ritualOrAffirmation: 'Afirmación: "Me perdono completa y profundamente. Suelto el castigo y me abro a la bendición de vivir en paz."'
  },
  {
    id: 'agotamiento-burnout',
    name: 'Agotamiento emocional crónico (Burnout)',
    category: 'Emociones y Conflictos Directos',
    organsAffected: 'Eje HPA (hipotálamo-hipófisis-suprarrenal)',
    emotionAndConflict: 'Haber dado más de lo que se tenía para ser reconocido o aceptado. Vaciamiento por no saber poner límites firmes a las demandas ajenas.',
    healingMessage: 'El descanso no es una recompensa que te ganas tras agotarte; es una necesidad biológica sagrada. Parar es un acto de valentía.',
    inquiryQuestions: [
      '¿A qué persona o compromiso necesito decir un "no" rotundo y tranquilo?',
      '¿Por qué siento que valgo menos si me tomo una tarde entera para descansar?',
      '¿Qué actividad me devuelve la chispa y hace cuánto no la practico?'
    ],
    ritualOrAffirmation: 'Ritual: Acuéstate en el suelo o en la cama con una almohada bajo las rodillas. Cierra los ojos durante 10 minutos sin hacer absolutamente nada.'
  },
  {
    id: 'duelo-perdida',
    name: 'Duelo por separación o pérdida afectiva',
    category: 'Emociones y Conflictos Directos',
    organsAffected: 'Chakra del corazón, timo, pulmones',
    emotionAndConflict: 'Sensación de desgarro interior ante la ausencia de un vínculo querido. Resistencia a soltar la historia que ya no continúa.',
    healingMessage: 'El amor que diste y recibiste nunca se destruye, vive dentro de ti para siempre. Tu capacidad de amar sigue intacta y florecerá de nuevo.',
    inquiryQuestions: [
      '¿Qué le diría a esa persona si tuviera un minuto para agradecerle lo vivido?',
      '¿Qué parte de mí siento que se fue con esa relación?',
      '¿Cómo puedo empezar a cuidarme como a la persona más amada de mi vida?'
    ],
    ritualOrAffirmation: 'Afirmación: "Agradezco lo compartido y bendigo tu camino. Me devuelvo mi energía y me cobijo con amor."'
  },
  {
    id: 'miedo-soledad',
    name: 'Miedo al abandono y a la soledad',
    category: 'Emociones y Conflictos Directos',
    organsAffected: 'Riñones, glándulas suprarrenales',
    emotionAndConflict: 'Herida de abandono en la infancia que revive ante el silencio o la distancia de los demás. Creencia errónea de que estar a solas es estar desprotegido.',
    healingMessage: 'Nunca estás solo/a cuando aprendes a ser tu mejor compañía. La soledad elegida es el santuario donde te reencuentras con tu poder.',
    inquiryQuestions: [
      '¿Qué me asusta de estar a solas con mis propios pensamientos?',
      '¿He tolerado faltas de respeto por miedo a quedarme sin pareja o amigos?',
      '¿Qué cita romántica o plan especial puedo tener conmigo hoy?'
    ],
    ritualOrAffirmation: 'Afirmación: "Soy mi propio refugio seguro. Mi compañía es dulce, valiosa y completa. Estoy en paz conmigo."'
  },
  {
    id: 'autoexigencia-perfeccionismo',
    name: 'Autoexigencia destructiva y crítica interior',
    category: 'Emociones y Conflictos Directos',
    organsAffected: 'Músculos del cuello, estómago, sistema inmune',
    emotionAndConflict: 'Creencia de que sólo se es digno de amor cuando no se cometen fallos. Una voz interna severa que nunca celebra las victorias.',
    healingMessage: 'La vida busca autenticidad, no perfección de museo. La belleza del ser humano está en sus grietas por donde entra la luz.',
    inquiryQuestions: [
      '¿De quién era esa voz severa que de niño me exigía ser impecable?',
      '¿Qué logro reciente he ignorado sin permitirme celebrarlo?',
      '¿Puedo celebrar hoy un error como un escalón natural de aprendizaje?'
    ],
    ritualOrAffirmation: 'Afirmación: "Soy suficiente tal como soy. Me permito ser imperfecto/a, humano/a y maravillosamente feliz."'
  }
];

export const symptomCategories: SymptomCategory[] = [
  'Cabeza y Sistema Nervioso',
  'Garganta, Voz y Expresión',
  'Pecho, Pulmones y Corazón',
  'Sistema Digestivo',
  'Espalda, Huesos y Articulaciones',
  'Piel y Sentidos',
  'Emociones y Conflictos Directos'
];
