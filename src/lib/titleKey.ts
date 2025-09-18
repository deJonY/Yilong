// src/lib/titleKey.ts
// RU matndan deterministik slug-kalit
export function titleKey(src: string) {
  const map: Record<string, string> = {
    ё:"yo", й:"y", ц:"ts", у:"u", к:"k", е:"e", н:"n", г:"g", ш:"sh", щ:"shch",
    з:"z", х:"h", ъ:"", ф:"f", ы:"y", в:"v", а:"a", п:"p", р:"r", о:"o", л:"l",
    д:"d", ж:"zh", э:"e", я:"ya", ч:"ch", с:"s", м:"m", и:"i", т:"t", ь:"",
    б:"b", ю:"yu"
  };
  const lower = (src || "").toLowerCase();
  // har bir kirill blokini translit qilamiz
  const translit = lower.replace(/[а-яё]+/g, chunk =>
    chunk.split("").map(c => map[c] ?? c).join("")
  );
  return translit
    .replace(/[.,;:()[\]{}'"“”‘’]/g, " ") // punktlarni tashlash
    .replace(/[×]/g, "x")
    .replace(/\s+/g, " ")                 // ichki bo'sh joylarni yig'ish
    .trim()
    .replace(/[^a-z0-9\s\-_/]/g, "")      // faqat xavfsiz belgilar
    .replace(/\s+/g, "-");                // slug
}
