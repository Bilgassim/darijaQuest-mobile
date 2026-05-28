
export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  unlocked: boolean;
  completed: boolean;
  content?: LessonContent;
}

export interface LessonContent {
  introduction: string;
  vocabulary: VocabularyItem[];
  culturalNote?: string;
  exercises: Exercise[];
}

export interface VocabularyItem {
  darija: string;
  transliteration: string;
  translation: string;
  audioUrl?: string;
}

export interface Exercise {
  type: 'multiple-choice' | 'listen-select' | 'pronunciation';
  question: string;
  options?: string[];
  correctAnswer: string;
  audioUrl?: string;
}

export const lessonsList: Lesson[] = [
  {
    id: 'greetings',
    title: 'Salutations Basiques',
    description: 'Apprenez à saluer en darija et à vous présenter',
    level: 'beginner',
    xpReward: 10,
    unlocked: true,
    completed: false,
    content: {
      introduction: "Dans cette leçon, nous apprendrons les salutations de base en darija marocain. Ces expressions sont essentielles pour commencer toute conversation.",
      vocabulary: [
        { darija: 'سلام', transliteration: 'Salam', translation: 'Bonjour/Salut', audioUrl: 'salam.mp3' },
        { darija: 'لاباس؟', transliteration: 'Labas?', translation: 'Comment ça va?', audioUrl: 'labas.mp3' },
        { darija: 'حمد لله', transliteration: 'Hamdullah', translation: 'Bien, grâce à Dieu', audioUrl: 'hamdullah.mp3' },
        { darija: 'شكرا', transliteration: 'Chokran', translation: 'Merci', audioUrl: 'chokran.mp3' },
        { darija: 'بسلامة', transliteration: 'Beslama', translation: 'Au revoir', audioUrl: 'beslama.mp3' },
      ],
      culturalNote: "Au Maroc, il est commun de répondre 'Hamdullah' (grâce à Dieu) quand quelqu'un vous demande comment vous allez, même si vous ne vous sentez pas particulièrement bien.",
      exercises: [
        {
          type: 'multiple-choice',
          question: 'Comment dit-on "Bonjour" en darija?',
          options: ['Chokran', 'Salam', 'Beslama', 'Labas'],
          correctAnswer: 'Salam',
        },
        {
          type: 'multiple-choice',
          question: 'Que signifie "Labas?"',
          options: ['Au revoir', 'Merci', 'Comment ça va?', 'Bien'],
          correctAnswer: 'Comment ça va?',
        }
      ],
    }
  },
  {
    id: 'intro-self',
    title: 'Faire Connaissance',
    description: 'Apprenez à demander le nom et l\'origine',
    level: 'beginner',
    xpReward: 15,
    unlocked: false,
    completed: false,
    content: {
      introduction: "Apprenez les phrases clés pour faire connaissance avec de nouvelles personnes au Maroc.",
      vocabulary: [
        { darija: 'شنو سميتك؟', transliteration: 'Chnou smithèque?', translation: 'Comment tu t\'appelles ?' },
        { darija: 'سميتي...', transliteration: 'Smity...', translation: 'Je m\'appelle...' },
        { darija: 'متشرفين', transliteration: 'Metcharfine', translation: 'Enchanté' },
        { darija: 'منين نتا؟', transliteration: 'Mnine nta?', translation: 'D\'où viens-tu ? (Masc)' },
        { darija: 'منين نتي؟', transliteration: 'Mnine nti?', translation: 'D\'où viens-tu ? (Fem)' },
        { darija: 'أنا من فرانسا', transliteration: 'Ana mn Franza', translation: 'Je viens de France' },
      ],
      culturalNote: "Le tutoiement est très courant au Maroc et n'est généralement pas considéré comme impoli, sauf avec les autorités.",
      exercises: [
        {
          type: 'multiple-choice',
          question: 'Comment dit-on "Je m\'appelle" ?',
          options: ['Chnou smithèque', 'Smity', 'Metcharfine', 'Ana mn'],
          correctAnswer: 'Smity',
        },
        {
          type: 'multiple-choice',
          question: 'Que signifie "Mnine nta?"',
          options: ['Comment ça va ?', 'D\'où viens-tu ?', 'Quel âge as-tu ?', 'Enchanté'],
          correctAnswer: 'D\'où viens-tu ?',
        }
      ]
    }
  },
  {
    id: 'numbers-1-10',
    title: 'Les Chiffres (1-10)',
    description: 'Apprenez à compter de 1 à 10',
    level: 'beginner',
    xpReward: 15,
    unlocked: false,
    completed: false,
    content: {
      introduction: "Les chiffres sont essentiels pour le quotidien : prix, heure, contacts.",
      vocabulary: [
        { darija: 'واحد', transliteration: 'Wahed', translation: 'Un' },
        { darija: 'جوج', transliteration: 'Jouj', translation: 'Deux' },
        { darija: 'تلاتة', transliteration: 'Tlata', translation: 'Trois' },
        { darija: 'ربعة', transliteration: 'Arba', translation: 'Quatre' },
        { darija: 'خمسة', transliteration: 'Khamsa', translation: 'Cinq' },
        { darija: 'ستة', transliteration: 'Setta', translation: 'Six' },
        { darija: 'سبعة', transliteration: 'Seb-a', translation: 'Sept' },
        { darija: 'تمانية', transliteration: 'Temanya', translation: 'Huit' },
        { darija: 'تسعود', transliteration: 'Tes-oud', translation: 'Neuf' },
        { darija: 'عشرة', transliteration: 'Achra', translation: 'Dix' },
      ],
      exercises: [
        {
          type: 'multiple-choice',
          question: 'Comment dit-on "Cinq" ?',
          options: ['Tlata', 'Khamsa', 'Setta', 'Arba'],
          correctAnswer: 'Khamsa',
        },
        {
          type: 'multiple-choice',
          question: 'Que signifie "Jouj" ?',
          options: ['Un', 'Deux', 'Trois', 'Quatre'],
          correctAnswer: 'Deux',
        }
      ]
    }
  },
  {
    id: 'restaurant',
    title: 'Au Restaurant',
    description: 'Commander à manger et demander l\'addition',
    level: 'beginner',
    xpReward: 20,
    unlocked: false,
    completed: false,
    content: {
      introduction: "Savourez la cuisine marocaine en apprenant à commander comme un local.",
      vocabulary: [
        { darija: 'بغيت...', transliteration: 'Brit...', translation: 'Je voudrais...' },
        { darija: 'واش عندك...؟', transliteration: 'Wech f-andek...?', translation: 'Est-ce que tu as... ?' },
        { darija: 'طاجين خضرة', transliteration: 'Tajine khodra', translation: 'Tajine de légumes' },
        { darija: 'كسكسو', transliteration: 'Kesksou', translation: 'Couscous' },
        { darija: 'قرعة د الما', transliteration: 'Qira dyal l-ma', translation: 'Bouteille d\'eau' },
        { darija: 'شحال عندي عفاك؟', transliteration: 'Ch-hal f-andi f-afak?', translation: 'L\'addition s\'il vous plaît (Combien je vous dois ?)' },
      ],
      culturalNote: "Sidi Ali est une marque d'eau minérale très connue au Maroc, souvent utilisée comme nom générique pour l'eau en bouteille.",
      exercises: [
        {
          type: 'multiple-choice',
          question: 'Comment demande-t-on l\'addition ?',
          options: ['Brit tajine', 'Ch-hal f-andi', 'Wech f-andek', 'Kesksou'],
          correctAnswer: 'Ch-hal f-andi',
        },
        {
          type: 'multiple-choice',
          question: 'Que signifie "Qira dyal l-ma" ?',
          options: ['Un tajine', 'Une bouteille d\'eau', 'Une salade', 'Le menu'],
          correctAnswer: 'Une bouteille d\'eau',
        }
      ]
    }
  },
  {
    id: 'essential-phrases',
    title: 'Phrases Essentielles',
    description: 'Maîtrisez les expressions de survie',
    level: 'beginner',
    xpReward: 20,
    unlocked: false,
    completed: false,
    content: {
      introduction: "Ces phrases vous aideront dans diverses situations quotidiennes.",
      vocabulary: [
        { darija: 'واخا', transliteration: 'Wakha', translation: 'D\'accord / OK' },
        { darija: 'زوين', transliteration: 'Zwin', translation: 'Bien / Beau' },
        { darija: 'ما فهمتش', transliteration: 'Ma fhem-tch', translation: 'Je n\'ai pas compris' },
        { darija: 'عفاك', transliteration: 'Afak', translation: 'S\'il te plaît' },
        { darija: 'سمحلي', transliteration: 'Smehli', translation: 'Pardon / Excuse-moi' },
        { darija: 'بزاف', transliteration: 'Bzaf', translation: 'Beaucoup' },
      ],
      culturalNote: "'Wakha' est probablement le mot le plus utile en darija. Il sert à confirmer, accepter ou dire que tout va bien.",
      exercises: [
        {
          type: 'multiple-choice',
          question: 'Comment dit-on "Beaucoup" ?',
          options: ['Zwin', 'Bzaf', 'Afak', 'Wakha'],
          correctAnswer: 'Bzaf',
        },
        {
          type: 'multiple-choice',
          question: 'Que signifie "Smehli" ?',
          options: ['D\'accord', 'S\'il vous plaît', 'Excusez-moi', 'Beau'],
          correctAnswer: 'Excusez-moi',
        }
      ]
    }
  },
  {
    id: 'time-location',
    title: 'Se Situer dans le Temps',
    description: 'Aujourd\'hui, hier, demain...',
    level: 'intermediate',
    xpReward: 25,
    unlocked: false,
    completed: false,
    content: {
      introduction: "Apprenez à parler des moments de la journée et de la semaine.",
      vocabulary: [
        { darija: 'ليوم', transliteration: 'Lyoum', translation: 'Aujourd\'hui' },
        { darija: 'البارح', transliteration: 'Lbareh', translation: 'Hier' },
        { darija: 'غدا', transliteration: 'Gheda', translation: 'Demain' },
        { darija: 'قبل', transliteration: 'Qbel', translation: 'Avant' },
        { darija: 'بعد', transliteration: 'Be-ad', translation: 'Après' },
        { darija: 'من بعد', transliteration: 'Mn be-ad', translation: 'Plus tard' },
      ],
      exercises: [
        {
          type: 'multiple-choice',
          question: 'Comment dit-on "Demain" ?',
          options: ['Lyoum', 'Lbareh', 'Gheda', 'Qbel'],
          correctAnswer: 'Gheda',
        }
      ]
    }
  },
  {
    id: 'religious-expressions',
    title: 'Expressions Spirituelles',
    description: 'Inchallah, Bismillah, Hamdullah...',
    level: 'intermediate',
    xpReward: 25,
    unlocked: false,
    completed: false,
    content: {
      introduction: "Ces expressions font partie intégrante du langage quotidien au Maroc, au-delà de la religion.",
      vocabulary: [
        { darija: 'إن شاء الله', transliteration: 'Inchallah', translation: 'Si Dieu le veut (pour le futur)' },
        { darija: 'بسم الله', transliteration: 'Bismillah', translation: 'Au nom de Dieu (avant de commencer)' },
        { darija: 'ما شاء الله', transliteration: 'Machallah', translation: 'Dieu l\'a voulu (pour complimenter)' },
        { darija: 'تبارك الله', transliteration: 'Tbarkallah', translation: 'Béni soit Dieu' },
        { darija: 'الله يحفظك', transliteration: 'Allah i-hafdek', translation: 'Que Dieu te protège (Merci/SVP)' },
      ],
      culturalNote: "Dire 'Inchallah' est essentiel pour tout projet futur. 'Machallah' est souvent utilisé pour éviter le 'mauvais œil' lors d'un compliment.",
      exercises: [
        {
          type: 'multiple-choice',
          question: 'Que dit-on avant de manger ou de commencer un travail ?',
          options: ['Hamdullah', 'Bismillah', 'Inchallah', 'Machallah'],
          correctAnswer: 'Bismillah',
        }
      ]
    }
  },
  {
    id: 'hammam',
    title: 'Le Hammam',
    description: 'Vocabulaire pour le bain traditionnel',
    level: 'intermediate',
    xpReward: 30,
    unlocked: false,
    completed: false,
    content: {
      introduction: "Le hammam est une institution sociale et de bien-être incontournable au Maroc.",
      vocabulary: [
        { darija: 'صابون بلدي', transliteration: 'Sabon beldi', translation: 'Savon noir traditionnel' },
        { darija: 'كيس', transliteration: 'Kiss', translation: 'Gant de gommage' },
        { darija: 'سطل', transliteration: 'Stel', translation: 'Seau' },
        { darija: 'حك لي ظهري', transliteration: 'Hok liya d-hehri', translation: 'Frotte-moi le dos' },
        { darija: 'سخون بزاف', transliteration: 'Skhoun bzaf', translation: 'C\'est trop chaud' },
      ],
      culturalNote: "Au hammam, il est courant de demander à quelqu'un de vous frotter le dos, c'est un geste d'entraide habituel.",
      exercises: [
        {
          type: 'multiple-choice',
          question: 'Comment appelle-t-on le savon noir ?',
          options: ['Sabon beldi', 'Kiss', 'Stel', 'Harcha'],
          correctAnswer: 'Sabon beldi',
        }
      ]
    }
  },
  {
    id: 'market-vegetables',
    title: 'Au Marché : Les Légumes',
    description: 'Faites vos courses comme un vrai Marocain',
    level: 'intermediate',
    xpReward: 30,
    unlocked: false,
    completed: false,
    content: {
      introduction: "Le marché (le souk) est le cœur battant de la vie marocaine. Apprenez le nom des légumes les plus courants.",
      vocabulary: [
        { darija: 'خضرة', transliteration: 'Khodra', translation: 'Légumes' },
        { darija: 'بطاطا', transliteration: 'Batata', translation: 'Pommes de terre' },
        { darija: 'ماطيشة', transliteration: 'Maticha', translation: 'Tomates' },
        { darija: 'خيزو', transliteration: 'Khizou', translation: 'Carottes' },
        { darija: 'بصلة', transliteration: 'Basla', translation: 'Oignon' },
        { darija: 'دنجال', transliteration: 'Denjal', translation: 'Aubergine' },
        { darija: 'عطيني 3 كيلو د بطاطا', transliteration: 'Atini 3 kilo d batata', translation: 'Donne-moi 3 kilos de patates' },
      ],
      culturalNote: "Au marché, on n'utilise pas le 'P'. Ainsi, 'pomme de terre' devient 'batata' et 'papa' devient 'baba'.",
      exercises: [
        {
          type: 'multiple-choice',
          question: 'Comment dit-on "Carottes" ?',
          options: ['Maticha', 'Khizou', 'Batata', 'Basla'],
          correctAnswer: 'Khizou',
        },
        {
          type: 'multiple-choice',
          question: 'Que signifie "Atini" ?',
          options: ['Je veux', 'Donne-moi', 'Combien', 'Regarde'],
          correctAnswer: 'Donne-moi',
        }
      ]
    }
  }
];

