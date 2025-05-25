export const languageList = [
  {
    name: "العربية",
    lang: "ar",
  },
  {
    name: "English",
    lang: "en",
  },
];

export const conditionStatus = [
  {
    en: "Overcast",
    ar: "غائم",
  },
  {
    en: "Partially cloudy",
    ar: "غائم جزئياً",
  },
  {
    en: "Rain, Partially cloudy",
    ar: "مطر، غائم جزئياً",
  },
  {
    en: "Clear",
    ar: "صافِ",
  },
  {
    en: "Snow, Rain, Partially cloudy",
    ar: "ثلوج، مطر، غائم جزئيا",
  },
  {
    en: "Snow, Rain, cloudy",
    ar: "ثلج، مطر، غائم",
  },
  {
    en: "Snow, Partially cloudy",
    ar: "ثلوج، غائم جزئيا",
  },
];

export const dayDetails = [
  {
    en: "cloudcover",
    ar: "الغطاء السحابي",
    icon: "fa-solid fa-cloud",
  },
  {
    en: "conditions",
    ar: "الظروف الجوية",
    icon: "fa-solid fa-fan",
  },
  {
    en: "humidity",
    ar: "الرطوبة",
    icon: "fa-solid fa-droplet",
  },
  {
    en: "dew",
    ar: "الندي",
    icon: "fa-solid fa-water",
  },
  {
    en: "pressure",
    ar: "الضغط الجوي",
    icon: "fa-solid fa-gauge",
  },
];

export const detailOfDay = [
  {
    en: "Similar temperatures continuing with no rain expected.",
    ar: "تستمر درجات الحرارة المماثلة مع عدم توقع هطول أمطار.",
  },
  {
    en: "Cooling down with no rain expected.",
    ar: "انخفاض درجات الحرارة مع عدم توقع هطول أمطار.",
  },
  {
    en: "Similar temperatures continuing with a chance of rain Thursday.",
    ar: "استمرار درجات الحرارة المماثلة مع احتمال هطول أمطار الخميس.",
  },
  {
    en: "Partly cloudy throughout the day with rain in the morning and afternoon.",
    ar: "غائم جزئيا طوال اليوم مع هطول أمطار في الصباح وبعد الظهر.",
  },
  {
    en: "Partly cloudy throughout the day with a chance of rain throughout the day.",
    ar: "غائم جزئيًا طوال اليوم مع فرصة هطول أمطار طوال اليوم.",
  },
  {
    en: "Partly cloudy throughout the day.",
    ar: "غائم جزئيا طوال اليوم.",
  },
  {
    en: "Clear conditions throughout the day.",
    ar: "أجواء صافية طوال اليوم.",
  },
  {
    en: "Partly cloudy throughout the day with morning rain.",
    ar: "غائم جزئيًا طوال اليوم مع هطول أمطار في الصباح.",
  },
  {
    en: "Becoming cloudy in the afternoon.",
    ar: "يصبح الجو غائما في فترة ما بعد الظهر.",
  },
];

export const days = [
  {
    en: "sat",
    ar: "السبت",
    enName: "Saturday",
  },
  {
    en: "sun",
    ar: "الأحد",
    enName: "Sunday",
  },
  {
    en: "mon",
    ar: "الأثنين",
    enName: "Monday",
  },
  {
    en: "tue",
    ar: "الثلاثاء",
    enName: "Tuesday",
  },
  {
    en: "wed",
    ar: "الأربعاء",
    enName: "Wednesday",
  },
  {
    en: "thu",
    ar: "الخميس",
    enName: "Thursday",
  },
  {
    en: "fri",
    ar: "الجمعة",
    enName: "Friday",
  },
];

export const months = [
  {
    en: "jan",
    ar: "يناير",
  },
  {
    en: "feb",
    ar: "فبراير",
  },
  { en: "March", ar: "مارس" },
  {
    en: "April",
    ar: "أبريل",
  },
  {
    en: "May",
    ar: "مايو",
  },
  {
    en: "June",
    ar: "يونيه",
  },
  {
    en: "July",
    ar: "يوليو",
  },
  {
    en: "August",
    ar: "أغسطس",
  },
  {
    en: "September",
    ar: "سبتمبر",
  },
  {
    en: "October",
    ar: "أكتوبر",
  },
  {
    en: "November",
    ar: "نوفمبر",
  },
  {
    en: "December",
    ar: "ديسمبر",
  },
];

export const windFeelAndRain = [
  {
    icon: "fa-solid fa-temperature-quarter",
    text: "الإحساس الحقيقي",
  },
  {
    icon: "fa-solid fa-droplet",
    text: "غطاء السحاب",
  },
  {
    icon: "fa-solid fa-wind",
    text: "الرياح",
  },
  {
    icon: "fa-solid fa-sun",
    text: "مؤشر الأشعة فوق البنفسجية",
  },
];

export const temVariable: {
  [key: string]: {
    c: string;
    f: string;
  };
} = {
  en: {
    c: "C",
    f: "F",
  },
  ar: {
    c: "م",
    f: "ف",
  },
};
