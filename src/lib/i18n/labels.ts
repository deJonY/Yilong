// // I18n label helperlari: kalitlar -> matn, xavfsiz fallback bilan
// export type TFunc = (k: string) => string | undefined;

// export const humanize = (s: string) =>
//   s.replace(/[-_]/g, " ").replace(/\s+/g, " ").trim().replace(/^./, c => c.toUpperCase());

// export function tt(t: TFunc | undefined, key: string, fallback?: string) {
//   try {
//     const v = t?.(key);
//     if (typeof v === "string" && v.trim() && v !== key) return v;
//   } catch {}
//   return fallback ?? "";
// }

// // Bir nechta kalitdan birinchisini olish (mavjud bo‘lsa)
// export function pickLabel(t: TFunc | undefined, keys: string[], fallback?: string) {
//   for (const k of keys) {
//     const v = t?.(k);
//     if (typeof v === "string" && v.trim() && v !== k) return v;
//   }
//   return fallback ?? "";
// }

// export function sectionTitle(t: TFunc | undefined, sectionId: string, fallback?: string) {
//   return tt(t, `catalog.sections.${sectionId}.title`, fallback ?? humanize(sectionId));
// }

// export function categoryTitle(
//   t: TFunc | undefined,
//   sectionId: string,
//   categoryId: string,
//   fallback?: string
// ) {
//   return tt(
//     t,
//     `catalog.sections.${sectionId}.categories.${categoryId}`,
//     fallback ?? humanize(categoryId)
//   );
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// I18n label helperlari: kalitlar -> matn, xavfsiz fallback bilan
export type TFunc = (k: string) => string | undefined;

export const humanize = (s: string) =>
  s.replace(/[-_]/g, " ").replace(/\s+/g, " ").trim().replace(/^./, c => c.toUpperCase());

export function tt(t: TFunc | undefined, key: string, fallback?: string) {
  try {
    const v = t?.(key);
    if (typeof v === "string" && v.trim() && v !== key) return v;
  } catch {}
  return fallback ?? "";
}

export function pickLabel(t: TFunc | undefined, keys: string[], fallback?: string) {
  for (const k of keys) {
    const v = t?.(k);
    if (typeof v === "string" && v.trim() && v !== k) return v;
  }
  return fallback ?? "";
}

export function sectionTitle(t: TFunc | undefined, sectionId: string, fallback?: string) {
  return tt(t, `catalog.sections.${sectionId}.title`, fallback ?? humanize(sectionId));
}

export function categoryTitle(
  t: TFunc | undefined,
  sectionId: string,
  categoryId: string,
  fallback?: string
) {
  return tt(
    t,
    `catalog.sections.${sectionId}.categories.${categoryId}`,
    fallback ?? humanize(categoryId)
  );
}
