// import ru from "./ru";
// import uz from "./uz";
// export const dictionaries = { ru, uz };
// export type Lang = keyof typeof dictionaries;

// src/i18n/dictionaries/index.ts
// import ru from "./ru";
// import uz from "./uz";

// export type Lang = "ru" | "uz";

// // Agar xohlasangiz dinamik import qilsak ham bo'ladi,
// // ammo bu yerda soddaroq — sinxron importlarni async qaytaramiz.
// export const dictionaries: Record<Lang, () => Promise<any>> = {
//   ru: async () => ru,
//   uz: async () => uz,
// };

// export async function getDictionary(lang: Lang) {
//   const loader = dictionaries[lang] ?? dictionaries.ru;
//   return loader();
// }

// src/i18n/dictionaries/index.ts
// import ru from "./ru";
// import uz from "./uz";

// export type Lang = "ru" | "uz";
// export const dictionaries = { ru, uz };

// export function getDictionary(lang: Lang) {
//   return dictionaries[lang] ?? ru; // to‘liq obyekt
// }

// import ru from "./ru";
// import uz from "./uz";

// export type Lang = "ru" | "uz";
// export type Dict = typeof ru;

// const maps: Record<Lang, Dict> = { ru, uz, };

// export function getDictionarySync(lang: Lang): Dict {
//   return maps[lang] ?? ru;
// }

// export async function getDictionary(lang: Lang): Promise<Dict> {
//   return maps[lang] ?? ru;
// }

// // src/i18n/dictionaries/index.ts
// import ru from "./ru";
// import uz from "./uz";
// export type Lang = "ru" | "uz";

// export const dictionaries = { ru, uz } as const;
// export function getDictionary(lang: Lang) {
//   return dictionaries[lang]; // ✅ Promise emas — sync obyekt
// }


// src/i18n/dictionaries/index.ts
import ru from "./ru";
import uz from "./uz";
export type Lang = "ru" | "uz";
const dictionaries = { ru, uz } as const;

export function getDictionary(lang: Lang) {
  return dictionaries[lang] ?? dictionaries.ru; // <-- sync
}
