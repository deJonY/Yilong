// // src/lib/titleTranslate.ts

// /**
//  * Mahsulot nomlarini (title) RU -> UZ (Latin) ga joyida o'giradigan engil funksiya.
//  * Hech qanday backend/Firestore o'zgarishi shart emas.
//  *
//  * Ishlash tartibi:
//  * 1) to'liq mos keladigan (exact) iboralar uchun mapping
//  * 2) umumiy so'z/ibora almashinuvi uchun regex replaslar
//  * 3) birliklar: мм->mm, м->m, x belgisi va bo'shliqlarni tozalash
//  */

// type Dict = Record<string, string>;

// // 1) To'liq mos keladigan iboralar (tez-tez uchraydiganlari)
// const EXACT: Dict = {
//   "ПВХ повышенной плотности 0,35": "PVX yuqori zichlikda 0,35",
//   "ПВХ стандартной плотности 0,40": "PVX standart zichlikda 0,40",
//   // Zarurat bo'lsa bu yerga yana aniq nomlarni qo'shaverasiz
// };

// // 2) So'z/ibora darajasida almashuvlar (keng qamrovli)
// const REPLACES: Array<[RegExp, string]> = [
//   // Material nomlari
//   [/ПВХ/gi, "PVX"],
//   [/Оргстекло/gi, "Orgsteklo"],
//   [/Акрил/gi, "Akryl"],
//   [/Роумарк/gi, "Roumark"],
//   [/Алюкобонд/gi, "Alukobond"],
//   [/Пенокартон/gi, "Penokarton"],

//   // Sifatlar/ta'riflar
//   [/повышенной плотности/gi, "yuqori zichlikda"],
//   [/стандартной плотности/gi, "standart zichlikda"],

//   // Umumiy so'zlar (mos kontekstda)
//   [/лист(?![а-я])/gi, "list"], // "лист" -> "list" ( ehtiyot: "лист..." ga mos)
//   [/белый/gi, "oq"],
//   [/прозрачн(ый|ая|ое|ые)/gi, "shaffof"],

//   // O'lcham birliklari va format
//   [/(^|\s)мм(\s|$)/gi, " mm "],
//   [/(^|\s)м(\s|$)/gi, " m "],
//   [/[×x]/g, " x "], // ko‘paytirish belgisi bir xil ko‘rinsin
// ];

// // Oddiy tozalash (keraksiz bo'shliqlarni yig'ish)
// function cleanSpaces(s: string) {
//   return s.replace(/\s+/g, " ").replace(/\s,\s/g, ", ").trim();
// }

// /**
//  * Asosiy tarjimon-funktsiya.
//  * @param title Serverdan kelgan nom (RU)
//  * @param locale "uz" bo'lsa o'giradi, boshqada aslini qaytaradi
//  */
// export function translateProductTitle(title?: string, locale: string = "ru"): string {
//   if (!title || locale !== "uz") return title ?? "";

//   // 0) Exact mapping (to'liq mos kelishi)
//   if (EXACT[title]) return EXACT[title];

//   let out = title;

//   // 1) Keng qamrovli regex almashuvlari
//   for (const [re, to] of REPLACES) {
//     out = out.replace(re, to);
//   }

//   // 2) Qavs ichidagi o'lchamlar odatda (1,22м x 2,44м) ko'rinishida bo'ladi:
//   // bu yerda faqat birliklar allaqachon REPLACES orqali almashgan bo'ladi

//   // 3) Bo'shliqlarni tozalash
//   out = cleanSpaces(out);

//   return out;
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// src/lib/titleTranslate.ts
import { PRODUCT_TITLES_UZ } from "@/data/product-titles.uz";
import { titleKey } from "./titleKey";

type Dict = Record<string, string>;

const EXACT: Dict = {
  "ПВХ повышенной плотности 0,35": "PVX yuqori zichlikda 0,35",
  "ПВХ стандартной плотности 0,40": "PVX standart zichlikda 0,40",
};

const REPLACES: Array<[RegExp, string]> = [
  [/ПВХ/gi, "PVX"],
  [/Оргстекло/gi, "Orgsteklo"],
  [/Акрил/gi, "Akryl"],
  [/Роумарк/gi, "Roumark"],
  [/Алюкобонд/gi, "Alukobond"],
  [/Пенокартон/gi, "Penokarton"],
  [/повышенной плотности/gi, "yuqori zichlikda"],
  [/стандартной плотности/gi, "standart zichlikda"],
  [/лист(?![а-я])/gi, "list"],
  [/белый/gi, "oq"],
  [/односторонний/gi, "bir tomonlama"],
  [/двухсторонний/gi, "ikki tomonlama"],
  [/прозрачн(ый|ая|ое|ые)/gi, "shaffof"],
  [/(^|\s)мм(\s|$)/gi, " mm "],
  [/(^|\s)м(\s|$)/gi, " m "],
  [/[×x]/g, " x "],
];

function cleanSpaces(s: string) {
  return s.replace(/\s+/g, " ").replace(/\s,\s/g, ", ").trim();
}

export function translateProductTitle(title?: string, locale: string = "ru"): string {
  if (!title || locale !== "uz") return title ?? "";

  // 1) Lug'at bo'yicha aniq moslik (kalit orqali)
  const key = titleKey(title);
  if (PRODUCT_TITLES_UZ[key]) return PRODUCT_TITLES_UZ[key];

  // 2) To‘liq EXACT moslik
  if (EXACT[title]) return EXACT[title];

  // 3) Regex/qoidalar
  let out = title;
  for (const [re, to] of REPLACES) out = out.replace(re, to);
  return cleanSpaces(out);
}
