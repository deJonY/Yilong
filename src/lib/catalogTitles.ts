// KATALOG MAP — path'ni loyihangizga moslang:

import { CATALOG } from "./catalog";


type AnyRec = Record<string, any>;

function pick(obj: AnyRec | undefined | null, path: string[]): any {
  return path.reduce((o, k) => (o && typeof o === "object" ? o[k] : undefined), obj || undefined);
}

/**
 * Sidebar katalogida uchraydigan odatiy tuzilmalar:
 *  A) sections[sectionId].categories[catId].title.{ru|uz}
 *  B) sections[sectionId].categories[catId].title_ru | title_uz
 *  C) sections[sectionId].categories[catId].title  (faqat bitta, ehtimol RU)
 */
export function getCatalogCategoryTitle(
  sectionId: string,
  categoryId: string,
  lang: "ru" | "uz"
): string | null {
  const base = (CATALOG as AnyRec)?.sections?.[sectionId]?.categories?.[categoryId];
  if (!base) return null;

  // A-variant
  const a = pick(base, ["title", lang]);
  if (typeof a === "string" && a.trim()) return a;

  // B-variant
  const b = base[`title_${lang}`];
  if (typeof b === "string" && b.trim()) return b;

  // C-variant (bitta title) — RU deb qabul qilamiz
  const c = base?.title;
  if (typeof c === "string" && c.trim()) {
    // lang uz bo'lsa — shuni qaytarib turamiz (ruscha bo'lsa ham kamida bo'sh qolmaydi)
    return c;
  }
  return null;
}
