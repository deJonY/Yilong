// src/lib/catalog.ts
// RU matnlar — default. UZ tarjimalar — TR_UZ xaritalarida.
// Har doim CATALOG (string) ni qaytaramiz; i18n matnlarni helperlar orqali olamiz.

export type Lang = "ru" | "uz";

export type Category = {
  id: string;
  title: string;      // HAR DOIM string (default RU)
  image?: string;
};

export type Section = {
  id: string;
  title: string;      // HAR DOIM string (default RU)
  image?: string;
  categories: Category[];
};

// ---------- ASOSIY DARAxt (RU) – siz berganingizga mos ----------
export const CATALOG: Section[] = [
  {
    id: "listovye-materialy",
    title: "Листовые материалы",
    categories: [
      { id: "pvh-yilong", title: "ПВХ YiLong" },
      { id: "orgsteklo-yilong", title: "Оргстекло YiLong" },
      { id: "pvc-yilong", title: "ПВС Формекс" },
      { id: "akril-jun-shang", title: "Акрил Xin Tao XT" },
      { id: "roumark-gravirovka", title: "Роумарк (пластик для гравировки)" },
      { id: "alyukobond", title: "Алюкобонд" },
      { id: "penokarton", title: "Пенокартон" },
    ],
  },
  {
    id: "rulonnye-materialy",
    title: "Рулонные материалы",
    categories: [
      { id: "banner-tkan", title: "Баннерная ткань" },
      { id: "beklit", title: "Беклит" },
      { id: "cvetnaya-samokley-vinil", title: "Цветная самоклеющаяся виниловая пленка" },
      { id: "magnitnyj-vinil", title: "Магнитный винил" },
      { id: "montazhnye-plenki", title: "Монтажные пленки" },
      { id: "pechatniy-orakal", title: "Печатний оракал" },
      { id: "tkan-dlya-sublimatsionoy-pechati", title: "Ткань для сублимационной печати" },
      { id: "vitrajnye-plenki", title: "Витражные пленки" },
      { id: "xolst", title: "Холст" },
    ],
  },
  {
    id: "istochniki-sveta",
    title: "Источники света (светодиоды, лампы и пр.)",
    categories: [
      { id: "led-prozhektory", title: "LED прожекторы (соффиты)" },
      { id: "moduli-svetodiodnye", title: "Модули светодиодные" },
      { id: "svetod-lenty", title: "Светодиодные ленты" },
      { id: "svetod-linejki-zhestkaya-osnova", title: "Светодиодные линейки на жесткой основе" },
      { id: "duralajt", title: "Дюралайт светодиодный" },
      { id: "svetilnik", title: "Светильник" },
      { id: "gibkij-neon", title: "Гибкий неон светодиодный" },
    ],
  },
  {
    id: "transformatory-i-upravlenie",
    title: "Трансформаторы и источники управления",
    categories: [
      { id: "transformatory-naruzh", title: "Трансформаторы (наружные)" },
      { id: "transformatory-vnutr", title: "Трансформаторы (внутренние)"},
    ],
  },
  {
    id: "chernila-kraski",
    title: "Чернила (краски)",
    categories: [
      { id: "solvent-kraski", title: "Сольвентные краски" },
      { id: "ecosolvent-kraski", title: "Экосольвентные краски" },
    ],
  },
  {
    id: "reklamno-vystavochnoe",
    title: "Рекламное и выставочное оборудование",
    categories: [
      { id: "flagchiki-flagi", title: "Флажочки (флаги)" },
      { id: "pop-up-stendy", title: "Поп-ап стенды (pop up, пресс-стены)" },
      { id: "promostoly", title: "Промостолы, промостойки" },
      { id: "roll-up", title: "Ролл-стенды roll up и паучки" },
    ],
  },
  {
    id: "alyuminievye-profily",
    title: "Алюминиевые профиля и комплектующие",
    categories: [
      { id: "profil-dlya-lent", title: "Алюминиевый профиль для светодиодных лент" },
    ],
  },
  {
    id: "kleevye-resheniya",
    title: "Клеевые решения (скотч, клей)",
    categories: [
      { id: "skotch", title: "Клеевые решения (скотч)" },
      { id: "klei", title: "Клей" },
    ],
  },
  {
    id: "instrumenty",
    title: "Инструменты",
    categories: [
      { id: "lezviya-dlya-nozhey", title: "Лезвия для ножей" },
      { id: "lyoversy-i-proboyniki", title: "Люверсы и пробойники" },
      { id: "rakeli", title: "Ракели" },
      { id: "ruchnye-instrumenty", title: "Ручные инструменты Hoji" },
    ],
  },
  {
    id: "frezy-i-gravery",
    title: "Фрезы и граверы",
    categories: [
      { id: "frezy", title: "Фрезы" },
      { id: "gravery", title: "Граверы" },
    ],
  },
];

// ---------- UZ tarjimalar (ID -> UZ matn) ----------

const TR_UZ = {
  sections: {
    "listovye-materialy": "Listli materiallar",
    "rulonnye-materialy": "Rulonli materiallar",
    "istochniki-sveta": "Yorug‘lik manbalari (LED va b.)",
    "transformatory-i-upravlenie": "Transformatorlar va boshqaruv manbalari",
    "chernila-kraski": "Siyohlar (bo‘yoqlar)",
    "reklamno-vystavochnoe": "Reklama va ko‘rgazma uskunalari",
    "alyuminievye-profily": "Alyuminiy profillar va komplektlar",
    "kleevye-resheniya": "Yopishtirish yechimlari (skotch, elim)",
    "metal-i-plast-furnitura": "Metall va plastik furnitura",
    "instrumenty": "Anjomlar",
    "frezy-i-gravery": "Freza va graverlar",
  } as Record<string, string>,
  categories: {
    "listovye-materialy": {
      "pvh-yilong": "PVX YiLong",
      "orgsteklo-yilong": "Orgsteklo YiLong",
      "pvc-yilong": "PVC Fomex",
      "akril-jun-shang": "Akril Xin Tao XT",
      "roumark-gravirovka": "Ro‘umark (gravirovka uchun plastik)",
      "alyukobond": "Alyukobond",
      "penokarton": "Penokarton",
    },
    // "rulonnye-materialy": {
    //   "banner-tkan": "Banner matosi",
    //   "beklit" : "Beklit (yoritiladigan banner materiali)"
    //   "materialy-dlya-pechati": "Bosma uchun materiallar",
    //   "tentovaya-tkan": "Tent matosi",
    //   "plenki-laminirovanie": "Laminatsiya plyonkalari",
    //   "cvetnaya-samokley-vinil": "Rangli yopishqoq vinil plyonka",
    //   "montazhnye-plenki": "Montaj plyonkalari",
    //   "vitrajnye-plenki": "Vitraj plyonkalar",
    //   "magnitnyj-vinil": "Magnitli vinil",
    //   "pechatniy-orakal": "Bosma uchun oboy",
    // },
    "rulonnye-materialy": {
      "banner-tkan": "Banner matosi",
      "beklit": "Beklit (yoritiladigan banner materiali)",
      "cvetnaya-samokley-vinil": "Rangli yopishqoq vinil plyonka",
      "magnitnyj-vinil": "Magnitli vinil",
      "montazhnye-plenki": "Montaj plyonkalari",
      "pechatniy-orakal": "Bosma uchun orakal",
      "tkan-dlya-sublimatsionoy-pechati": "Sublimatsion bosma uchun mato",
      "vitrajnye-plenki": "Vitraj plyonkalar",
      "xolst": "Xolst"
    }
    // "istochniki-sveta": {
    //   "led-prozhektory": "LED proyektorlar (sofitlar)",
    //   "moduli-svetodiodnye": "LED modullar",
    //   "svetod-lenty": "LED lentalar",
    //   "svetod-linejki-zhestkaya-osnova": "Qattiq asosli LED lineykalar",
    //   "duralajt": "LED duralayt",
    //   "svetilnik": "Chiroq (svetilnik)",
    //   "gibkij-neon": "Moslashuvchan LED neon",
    // },
    "istochniki-sveta": {
      "led-prozhektory": "LED proyektorlar (sofitlar)",
      "moduli-svetodiodnye": "LED modullar",
      "svetod-lenty": "LED lentalar",
      "svetod-linejki-zhestkaya-osnova": "Qattiq asosli LED lineykalar",
      "duralajt": "LED duralayt",
      "svetilnik": "Chiroq",
      "gibkij-neon": "Moslashuvchan LED neon"
    }

    "transformatory-i-upravlenie": {
      "transformatory-naruzh": "Transformatorlar (ichki va tashqi)",
      "transformatory-vnutr": "Kontrollerlar, dimmerlar, kuchaytirgichlar",
    },
    "chernila-kraski": {
      "solvent-kraski": "Solvent bo‘yoqlar",
      "ecosolvent-kraski": "Ekosolvent bo‘yoqlar",
    },
    // "reklamno-vystavochnoe": {
    //   "pop-up-stendy": "Pop-up stendlar (press-wall)",
    //   "x-konstrukcii": "X-konstruksiyalar, X-bannerlar",
    //   "roll-up": "Roll-up stendlar",
    //   "promostoly": "Promo stollar, promostoykalar",
    //   "flagchiki-flagi": "Bayroqchalar (bayroqlar)",
    //   "posm-raznoe": "POSM materiallar (turli)",
    //   "bukletnicy": "Buklet qo‘yish stendlari",
    // },
    "reklamno-vystavochnoe": {
      "pop-up-stendy": "Pop-up stendlar (press-wall)",
      "x-konstrukcii": "X-konstruksiyalar (X-bannerlar)",
      "roll-up": "Roll-up stendlar",
      "promostoly": "Promo stollar (promostoykalar)",
      "flagchiki-flagi": "Bayroqchalar (bayroqlar)",
      "posm-raznoe": "POSM materiallari (turli)",
      "bukletnicy": "Buklet stendlari"
    }

    "alyuminievye-profily": {
      "profil-dlya-lent": "LED lentalar uchun alyuminiy profil",
    },
    "kleevye-resheniya": {
      "skotch": "Skotchlar",
      "klei": "Elimlar",
    },
    "metal-i-plast-furnitura": {
      "kajma-plastikovaya": "Plastik qirra",
      "metal-furnitura": "Metall furnitura",
      "neodimovye-magnity": "Neodim magnitlar",
    },
    "instrumenty": {
      "ruchnye-instrumenty": "Qo‘l anjomlari",
      "postpechatnye-instrumenty": "Bosmadan keyingi anjomlar",
    },
    "frezy-i-gravery": {
      "frezy": "Frezalar",
      "gravery": "Graverlar",
    },
  } as Record<string, Record<string, string>>,
};

// ---------- Helperlar: i18n sarlavha olish ----------
function findSection(secId: string) {
  return CATALOG.find((s) => s.id === secId);
}

function findCategory(secId: string, catId: string) {
  const sec = findSection(secId);
  return sec?.categories.find((c) => c.id === catId);
}

export function getSectionTitle(secId: string, lang: Lang = "ru") {
  if (lang === "uz") {
    const uz = TR_UZ.sections[secId];
    if (uz) return uz;
  }
  return findSection(secId)?.title ?? secId;
}

export function getCategoryTitle(secId: string, catId: string, lang: Lang = "ru") {
  if (lang === "uz") {
    const uz = TR_UZ.categories[secId]?.[catId];
    if (uz) return uz;
  }
  return findCategory(secId, catId)?.title ?? catId;
}

// Katalogni tanlangan tilga tayyorlab beruvchi funksiya (string-only)
export function getCatalogForLang(lang: Lang = "ru"): Array<{
  id: string;
  title: string;
  image?: string;
  categories: Array<{ id: string; title: string; image?: string }>;
}> {
  return CATALOG.map((sec) => ({
    id: sec.id,
    image: sec.image,
    title: getSectionTitle(sec.id, lang),
    categories: (sec.categories || []).map((c) => ({
      id: c.id,
      image: c.image,
      title: getCategoryTitle(sec.id, c.id, lang),
    })),
  }));
}
