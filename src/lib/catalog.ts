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
      { id: "pvh-yilong", title: "ПВХ Формекс" }, //1
      { id: "orgsteklo-yilong", title: "Оргстекло YiLong" }, //2
      { id: "pvc-yilong", title: "PVC YiLong" }, //3
      { id: "akril-jun-shang", title: "Акрил XT Xin Tao" }, //4
      { id: "roumark-gravirovka", title: "Роумарк (пластик для гравировки)" }, //5
      { id: "alyukobond", title: "Алюкобонд" }, //6
      { id: "penokarton", title: "Пенокартон" }, //7
    ],
  },
  {
    id: "rulonnye-materialy",
    title: "Рулонные материалы",
    categories: [
      { id: "banner-tkan", title: "Баннерная ткань" }, //1
      { id: "cvetnaya-samokley-vinil", title: "Цветная самоклеющаяся виниловая пленка" }, //2
      { id: "montazhnye-plenki", title: "Монтажные пленки" }, //3
      { id: "vitrajnye-plenki", title: "Витражные пленки" }, //4
      { id: "magnitnyj-vinil", title: "Магнитный винил" }, //5
      { id: "beklit", title: "Беклит" }, //6
      { id: "xolst", title: "Холст" }, //7
      { id: "tkan-dlya-sublimatsionoy-pechati", title: "Ткань для сублимационной печати" }, //8
      { id: "pechatniy-orakal", title: "Печатний оракал" }, //9
    ],
  },
  {
    id: "istochniki-sveta",
    title: "Источники света (светодиоды, лампы и пр.)",
    categories: [
      // { id: "led-prozhektory", title: "LED прожекторы (соффиты)" }, //1
      { id: "moduli-svetodiodnye", title: "Модули светодиодные" }, //2
      { id: "svetod-lenty", title: "Светодиодные ленты" }, //3
      { id: "svetod-linejki-zhestkaya-osnova", title: "Светодиодные линейки на жесткой основе" }, //4
      // { id: "duralajt", title: "Дюралайт светодиодный" }, //5
      // { id: "svetilnik", title: "Светильник" }, //6
      { id: "gibkij-neon", title: "Гибкий неон светодиодный" }, //7
    ],
  },
  {
    id: "transformatory-i-upravlenie",
    title: "Трансформаторы и источники управления",
    categories: [
      { id: "transformatory-naruzh", title: "Трансформаторы (наружные)" }, //1
      { id: "transformatory-vnutr", title: "Трансформаторы (внутренние)" }, //2
    ],
  },
  {
    id: "chernila-kraski",
    title: "Чернила (краски)",
    categories: [
      { id: "solvent-kraski", title: "Сольвентные краски" }, //1
      { id: "ecosolvent-kraski", title: "Экосольвентные краски" }, //2
    ],
  },
  {
    id: "reklamno-vystavochnoe",
    title: "Рекламное и выставочное оборудование",
    categories: [
      { id: "pop-up-stendy", title: "Поп-ап стенды (pop up, пресс-стены)" }, //1
      { id: "roll-up", title: "Ролл-стенды roll up и паучки" }, //2
      { id: "flagchiki-flagi", title: "Флажочки (флаги)" }, //3
      { id: "promostoly", title: "Промостолы, промостойки" }, //4
    ],
  },
  {
    id: "alyuminievye-profily",
    title: "Алюминиевые профиля и комплектующие",
    categories: [
      { id: "profil-dlya-lent", title: "Алюминиевый профиль для светодиодных лент" }, //1
    ],
  },
  {
    id: "kleevye-resheniya",
    title: "Клеевые решения (скотч, клей)",
    categories: [
      { id: "skotch", title: "Двусторонний ленты (скотч)" }, //1
      { id: "klej", title: "Клей" }, //2
    ],
  },
  {
    id: "metal-i-plast-furnitura",
    title: "Металлическая и пластиковая фурнитура",
    categories: [
      { id: "distantsionnye-derjateli-serebro", title: "Дистанционные держатели (серебро)" }, //1
    ],
  },
  {
    id: "instrumenty",
    title: "Инструменты",
    categories: [
      { id: "ruchnye-instrumenty", title: "Ручные инструменты Hoji" }, //1
      { id: "lezviya-dlya-nozhey", title: "Лезвия для ножей" }, //2
      { id: "lyoversy-i-proboyniki", title: "Люверсы и пробойники" }, //3
      { id: "rakeli", title: "Ракели" }, //4
    ],
  },
  {
    id: "frezy-i-gravery",
    title: "Фрезы и граверы",
    categories: [
      { id: "frezy", title: "Фрезы" }, //1
      { id: "gravery", title: "Граверы" }, //2
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
      "pvh-yilong": "PVX Fomex",
      "orgsteklo-yilong": "Orgsteklo YiLong",
      "pvc-yilong": "PVC YiLong",
      "akril-jun-shang": "Akril XT Xin Tao",
      "roumark-gravirovka": "Ro‘umark (gravirovka uchun plastik)",
      "alyukobond": "Alyukobond",
      "penokarton": "Penokarton",
    },

    "rulonnye-materialy": {
      "banner-tkan": "Banner matosi",
      "cvetnaya-samokley-vinil": "Rangli yopishqoq vinil plyonka",
      "montazhnye-plenki": "Montaj plyonkalari",
      "vitrajnye-plenki": "Vitraj plyonkalar",
      "magnitnyj-vinil": "Magnitli vinil",
      "beklit": "Beklit",
      "xolst": "Xolst",
      "tkan-dlya-sublimatsionoy-pechati": "Sublimatsion bosma uchun mato",
      "pechatniy-orakal": "Bosma uchun orakal",
    },

    "istochniki-sveta": {
      "led-prozhektory": "LED proyektorlar (sofitlar)",
      "moduli-svetodiodnye": "LED modullar",
      "svetod-lenty": "LED lentalar",
      "svetod-linejki-zhestkaya-osnova": "Qattiq asosli LED lineykalar",
      "duralajt": "LED duralayt",
      "svetilnik": "Chiroq",
      "gibkij-neon": "Moslashuvchan LED neon",
    },

    "transformatory-i-upravlenie": {
      "transformatory-naruzh": "Transformatorlar (tashqi)",
      "transformatory-vnutr": "Transformatorlar (ichki)",
    },

    "chernila-kraski": {
      "solvent-kraski": "Solvent bo‘yoqlar",
      "ecosolvent-kraski": "Ekosolvent bo‘yoqlar",
    },

    "reklamno-vystavochnoe": {
      "pop-up-stendy": "Pop-up stendlar (press-wall)",
      "roll-up": "Roll-up stendlar",
      "flagchiki-flagi": "Bayroqchalar (bayroqlar)",
      "promostoly": "Promo stollar (promostoykalar)",
    },

    "alyuminievye-profily": {
      "profil-dlya-lent": "LED lentalar uchun alyuminiy profil",
    },

    "kleevye-resheniya": {
      "skotch": "Ikki tomonlama lentlar (skotch)",
      "klej": "Elim",
    },

    "metal-i-plast-furnitura": {
      "distantsionnye-derjateli-serebro": "Distantsion tutqichlar (kumush)",
    },

    "instrumenty": {
      "ruchnye-instrumenty": "Qo‘l asboblari Hoji",
      "lezviya-dlya-nozhey": "Pichoqlar uchun lezviyalar",
      "lyoversy-i-proboyniki": "Lyoverslar va proboyniklar",
      "rakeli": "Rakelar",
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
