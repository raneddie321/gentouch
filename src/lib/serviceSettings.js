const STORAGE_KEY = 'dudu_service_settings_v1';

export const DEFAULT_SERVICE_SETTINGS = [
  {
    id: 'home',
    label: 'טיפול עד הבית',
    emoji: '🏠',
    duration: '60 דקות',
    price: '₪350',
    desc: 'טיפול מקצועי שמגיע אליכם הביתה, באזור חדרה עד נתניה, בלי נסיעות ובלי לחץ.',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1024&q=80',
    imageClassName: '',
  },
  {
    id: 'medical',
    label: 'עיסוי רפואי',
    emoji: '🩺',
    duration: '60 דקות',
    price: '₪280',
    desc: 'טיפול ממוקד להקלה על כאבים, שחרור עומסים ושיפור טווחי תנועה.',
    image: 'https://i.ibb.co/dwpjJSxf/Chat-GPT-Image-Mar-31-2026-04-36-01-PM.png',
    imageClassName: '',
  },
  {
    id: 'sport',
    label: 'עיסוי ספורטאים',
    emoji: '🏃',
    duration: '60 דקות',
    price: '₪300',
    desc: 'טיפול שמתאים לפני ואחרי פעילות, לשיפור התאוששות והפחתת עומס שרירי.',
    image: 'https://i.ibb.co/pjLJ7Z8x/massage-tissue-deep-slider-scaled.jpg',
    imageClassName: '',
  },
  {
    id: 'spa',
    label: 'טיפולי ספא',
    emoji: '✨',
    duration: '60 דקות',
    price: '₪260',
    desc: 'טיפול רך ומרגיע שמעניק לגוף שקט, חום ונשימה עמוקה.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1024&q=80',
    imageClassName: '',
  },
  {
    id: 'swedish',
    label: 'עיסוי שוודי קלאסי',
    emoji: '🌿',
    duration: '60 דקות',
    price: '₪260',
    desc: 'עיסוי קלאסי בתנועות ארוכות וזורמות לשחרור מתחים והרפיה מלאה.',
    image: 'https://i.ibb.co/r9HCmBr/Firefly-gpt-image-119712.png',
    imageClassName: 'scale-125',
  },
];

function normalizeService(service) {
  return {
    id: service.id || '',
    label: service.label || '',
    emoji: service.emoji || '',
    duration: service.duration || '',
    price: service.price || '',
    desc: service.desc || '',
    image: service.image || '',
    imageClassName: service.imageClassName || '',
  };
}

export function getServiceSettings() {
  if (typeof window === 'undefined') return DEFAULT_SERVICE_SETTINGS;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return DEFAULT_SERVICE_SETTINGS;

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return DEFAULT_SERVICE_SETTINGS;
    const map = new Map(parsed.map((item) => [item.id, normalizeService(item)]));
    return DEFAULT_SERVICE_SETTINGS.map((base) => ({
      ...base,
      ...(map.get(base.id) || {}),
      id: base.id,
    }));
  } catch {
    return DEFAULT_SERVICE_SETTINGS;
  }
}

export function saveServiceSettings(services) {
  if (typeof window === 'undefined') return;
  const normalized = services.map((service) => normalizeService(service));
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
}

export function resetServiceSettings() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}
