// src/lib/search.ts
// Kiril ↔ Lotin va umumiy normalizatsiya (katta-kichik, diakritiklarni, bo'shliqlarni)
export function normalizeText(s: string): string {
  if (!s) return "";
  const lower = s.toLowerCase();

  // Diakritiklarni olib tashlash (masalan: o‘ -> o)
  const noDiacritics = lower
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/’|ʻ|`|´|‘/g, "'");

  // Uzbek lotin ↔ kiril asosiy mapping (eng ko‘p uchraydiganlari)
  // Eslatma: to'liq konverter emas, lekin qidiruv uchun yetarli.
  const map: Record<string, string> = {
    // kiril → lotin (asosiy harflar)
    "қ":"q","ў":"o'","ғ":"g'","ҳ":"h","ш":"sh","ч":"ch","ё":"yo","ю":"yu","я":"ya","й":"y","э":"e","ъ":"'", "ь":"",
    "Қ":"q","Ў":"o'","Ғ":"g'","Ҳ":"h","Ш":"sh","Ч":"ch","Ё":"yo","Ю":"yu","Я":"ya","Й":"y","Э":"e","Ъ":"'", "Ь":"",
    "ў":"o'","ғ":"g'","қ":"q","ҳ":"h",
    // ruscha maxsus
    "ё":"yo","й":"y","ц":"ts","щ":"sch","ы":"y","э":"e","ю":"yu","я":"ya",
    // lotin -> lotin (stabilizatsiya)
  };

  const toLatin = noDiacritics
    .split("")
    .map(ch => map[ch] ?? ch)
    .join("");

  // Faqat harf/raqam va apostrof, bo'shliqni bitta probelga
  return toLatin.replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim();
}

// Matn ichida (substring) mosligini tekshirish — kiril/lotin farqsiz
export function textMatches(haystack: string, needle: string): boolean {
  const h = normalizeText(haystack);
  const n = normalizeText(needle);
  if (!h || !n) return false;
  return h.includes(n);
}

// Autocomplete uchun oddiy scorening (boshi bilan moslik > ichida moslik)
export function scoreMatch(title: string, q: string): number {
  const H = normalizeText(title);
  const Q = normalizeText(q);
  if (!H || !Q) return 0;
  if (H.startsWith(Q)) return 100 - Math.min(99, H.length - Q.length);
  if (H.includes(Q)) return 60 - Math.min(59, H.indexOf(Q));
  return 0;
}

// HREF’ni to'g'rilash (cards/first-card.tsx dagidek)
export function normalizeHref(slug?: string): string {
  if (!slug) return "#";
  let s = slug.trim();
  s = s.replace(/^product\//i, "");
  if (!s.startsWith("/")) s = `/${s}`;
  return s;
}
