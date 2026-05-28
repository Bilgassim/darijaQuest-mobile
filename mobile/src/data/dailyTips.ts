
export interface DailyTip {
  id: string;
  tip: string;
  category: 'pronunciation' | 'grammar' | 'vocabulary' | 'culture';
}

export const dailyTips: DailyTip[] = [
  {
    id: '1',
    tip: "Dans le darija marocain, la prononciation est cruciale! Contrairement au français, certaines lettres comme 'ح' (H emphatique) n'existent pas en français. Écoutez attentivement les exemples audio pour perfectionner votre accent.",
    category: 'pronunciation'
  },
  {
    id: '2',
    tip: "Le mot 'بزاف' (bzaf) signifie 'beaucoup' en darija. C'est un mot très utilisé au quotidien : 'كانحبك بزاف' (kanhebek bzaf) = 'je t'aime beaucoup'.",
    category: 'vocabulary'
  },
  {
    id: '3',
    tip: "En darija, on utilise souvent 'واخا' (wakha) pour dire 'c'est bon' ou 'ça marche'. C'est l'équivalent de 'OK' en français!",
    category: 'vocabulary'
  },
  {
    id: '4',
    tip: "Saviez-vous que 'السلام عليكم' (salam alaykum) se dit à toute heure de la journée au Maroc? C'est la salutation la plus respectueuse et universelle.",
    category: 'culture'
  },
  {
    id: '5',
    tip: "Le son 'غ' (ghain) n'existe pas en français. Pour le prononcer, imaginez que vous vous gargarisez doucement. Entraînez-vous avec le mot 'مغريب' (maghrib).",
    category: 'pronunciation'
  },
  {
    id: '6',
    tip: "En darija, les verbes se conjuguent différemment de l'arabe classique. 'كاناكل' (kanakol) = 'je mange', 'كاتاكل' (katakol) = 'tu manges'.",
    category: 'grammar'
  },
  {
    id: '7',
    tip: "Le thé à la menthe 'أتاي' (atay) est bien plus qu'une boisson au Maroc - c'est un rituel social. Dire 'بغيت أتاي' (bghit atay) vous fera toujours accueillir chaleureusement!",
    category: 'culture'
  },
  {
    id: '8',
    tip: "Pour demander le prix en darija, utilisez 'شحال؟' (chhal?). C'est plus courant que l'arabe classique 'كم؟' (kam?).",
    category: 'vocabulary'
  },
  {
    id: '9',
    tip: "La lettre 'ع' (ayn) se prononce en contractant la gorge. Entraînez-vous avec 'عاد' (aad) qui signifie 'encore' ou 'maintenant'.",
    category: 'pronunciation'
  },
  {
    id: '10',
    tip: "Au Maroc, on dit 'بصحة' (bseha) pour dire 'à vos souhaits' quand quelqu'un éternue. Littéralement, cela signifie 'à la santé'.",
    category: 'culture'
  },
  {
    id: '11',
    tip: "Le darija emprunte beaucoup de mots au français et à l'espagnol. 'طوموبيل' (tomobil) vient de 'automobile', 'سباردرين' (sbardrin) de 'espadrilles'.",
    category: 'vocabulary'
  },
  {
    id: '12',
    tip: "En darija, 'ما' (ma) + verbe + 'ش' (ch) forme la négation. Exemple: 'ما كانفهمش' (ma kanfhemch) = 'je ne comprends pas'.",
    category: 'grammar'
  },
  {
    id: '13',
    tip: "Le son 'ر' (r) en darija est roulé, comme en espagnol. Pratiquez avec 'برد' (berd) qui signifie 'froid'.",
    category: 'pronunciation'
  },
  {
    id: '14',
    tip: "Quand un Marocain dit 'إن شاء الله' (inchallah), cela ne signifie pas toujours 'peut-être'. Souvent, c'est une façon polie de dire 'oui' tout en laissant la décision finale à Dieu.",
    category: 'culture'
  },
  {
    id: '15',
    tip: "'لباس' (lebas) signifie 'ça va?' en darija. C'est une salutation très courante, plus décontractée que 'كيف داير؟' (kif dayr?).",
    category: 'vocabulary'
  }
];

// Fonction pour obtenir l'astuce du jour basée sur la date
export function getTodaysTip(): DailyTip {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const tipIndex = dayOfYear % dailyTips.length;
  return dailyTips[tipIndex];
}

// Fonction pour obtenir une astuce aléatoire par catégorie
export function getTipByCategory(category: DailyTip['category']): DailyTip {
  const categoryTips = dailyTips.filter(tip => tip.category === category);
  const randomIndex = Math.floor(Math.random() * categoryTips.length);
  return categoryTips[randomIndex];
}
