// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import { Search } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useI18n } from "@/components/i18n/I18nProvider";
// import { fetchSections, fetchCategories, fetchAllSizeItems, type ItemDoc, } from "@/lib/firebase/queries";
// import { normalizeHref, scoreMatch, textMatches } from "@/lib/search";

// type SItem = {
//   id: string;
//   title: string;
//   slug?: string;
//   sectionId: string;
//   categoryId: string;
//   image?: string;
// };

// const MAX_SUGGESTIONS = 8;
// // Har bir kategoriya bo‘yicha nechta item keltiramiz (MVP):
// const ITEMS_PER_CAT = 40;

// export default function SearchBox() {
//   const { t, lang } = useI18n() as any;
//   const router = useRouter();
//   const [q, setQ] = useState("");
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [pool, setPool] = useState<SItem[]>([]);
//   const wrapRef = useRef<HTMLDivElement | null>(null);

//   // Bir marta “pool”ni yuklab olamiz (rus/uz tarjimalar asosida)
//   useEffect(() => {
//     let alive = true;
//     (async () => {
//       try {
//         setLoading(true);
//         const secs = await fetchSections(lang); // "ru" | "uz"
//         const out: SItem[] = [];
//         for (const s of secs) {
//           const cats = await fetchCategories(s.id, lang);
//           for (const c of cats) {
//             // Kategoriya ichidagi barcha size’lardan birlashgan ro‘yxat:
//             const items = await fetchAllSizeItems(s.id, c.id, ITEMS_PER_CAT, lang);
//             for (const it of items) {
//               out.push({
//                 id: String(it.id),
//                 title: it.title,
//                 slug: it.slug,
//                 sectionId: s.id,
//                 categoryId: c.id,
//                 image: (it as any).image || (it as any).img || undefined,
//               });
//             }
//           }
//         }
//         if (alive) setPool(out);
//       } catch (e) {
//         console.error("Search preload error:", e);
//       } finally {
//         if (alive) setLoading(false);
//       }
//     })();
//     return () => { alive = false; };
//   }, [lang]);

//   // Query bo‘yicha takliflar
//   const suggestions = useMemo(() => {
//     if (!q.trim()) return [];
//     const filtered = pool
//       .filter(p => textMatches(p.title, q))
//       .map(p => ({ ...p, _score: scoreMatch(p.title, q) }))
//       .sort((a, b) => b._score - a._score)
//       .slice(0, MAX_SUGGESTIONS);
//     return filtered;
//   }, [q, pool]);

//   // Tashqariga bosilganda yopish
//   useEffect(() => {
//     function onClickOutside(e: MouseEvent) {
//       if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
//         setOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", onClickOutside);
//     return () => document.removeEventListener("mousedown", onClickOutside);
//   }, []);

//   function go(item: SItem) {
//     const href = normalizeHref(item.slug || `/${item.sectionId}/${item.categoryId}`);
//     router.push(href);
//     setOpen(false);
//   }

//   function onSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (suggestions[0]) go(suggestions[0]);
//   }

//   return (
//     <div ref={wrapRef} className="relative">
//       <form onSubmit={onSubmit}>
//         <input
//           type="text"
//           value={q}
//           onChange={(e) => { setQ(e.target.value); setOpen(true); }}
//           placeholder={t("hero.search_placeholder")}
//           className="w-full px-4 py-4 rounded-lg pr-12 bg-white outline-none"
//           onFocus={() => setOpen(true)}
//         />
//         <button
//           type="submit"
//           className="absolute right-3 top-1/2 -translate-y-1/2 p-2"
//           aria-label="Search"
//         >
//           <Search className="w-6 h-6 text-gray-900" />
//         </button>
//       </form>

//       {/* Dropdown */}
//       {open && q.trim() && (
//         <div className="absolute mt-2 left-0 right-0 bg-white rounded-lg shadow-lg border z-20 max-h-96 overflow-auto">
//           {loading && pool.length === 0 ? (
//             <div className="p-3 text-sm text-gray-500">{t("common.loading")}</div>
//           ) : suggestions.length === 0 ? (
//             <div className="p-3 text-sm text-gray-500">{t("common.empty")}</div>
//           ) : (
//             <ul className="divide-y">
//               {suggestions.map((s) => (
//                 <li key={`${s.sectionId}-${s.categoryId}-${s.id}`}>
//                   <button
//                     type="button"
//                     className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 text-left"
//                     onClick={() => go(s)}
//                   >
//                     {/* eslint-disable-next-line @next/next/no-img-element */}
//                     <img
//                       src={s.image || "/placeholder.svg"}
//                       alt={s.title}
//                       className="w-10 h-10 object-contain"
//                     />
//                     <div className="flex-1">
//                       <div className="text-sm font-medium text-gray-900">{s.title}</div>
//                       <div className="text-xs text-gray-500">
//                         /{s.sectionId}/{s.categoryId}
//                       </div>
//                     </div>
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/components/i18n/I18nProvider";
import {
  fetchSections,
  fetchCategories,
  fetchAllSizeItems,
  type ItemDoc,
} from "@/lib/firebase/queries";
import { normalizeHref, scoreMatch, textMatches } from "@/lib/search";

type SItem = {
  id: string;
  title: string;
  slug?: string;
  sectionId: string;
  categoryId: string;
  image?: string;
};

const MAX_SUGGESTIONS = 8;
const ITEMS_PER_CAT = 40;

export default function SearchBox() {
  const { t, lang } = useI18n() as any;
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pool, setPool] = useState<SItem[]>([]);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // ✅ xavfsiz tarjima helper – kalit topilmasa fallback ko‘rsatadi
  const tt = useCallback(
    (key: string, fb?: string) => {
      try {
        const v = t?.(key);
        if (typeof v === "string" && v.trim()) return v;
        if (process.env.NODE_ENV !== "production") {
          console.warn("[i18n-missing]", key);
        }
      } catch {}
      return fb ?? "";
    },
    [t]
  );

  // Bir marta “pool”ni yuklab olamiz (lang bo‘yicha)
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const secs = await fetchSections(lang); // "ru" | "uz"
        const out: SItem[] = [];

        for (const s of secs) {
          const cats = await fetchCategories(s.id, lang);
          for (const c of cats) {
            const items = await fetchAllSizeItems(s.id, c.id, ITEMS_PER_CAT, lang);
            for (const it of items as ItemDoc[]) {
              out.push({
                id: String(it.id),
                title: it.title,
                slug: (it as any).slug,
                sectionId: s.id,
                categoryId: c.id,
                image: (it as any).image || (it as any).img || undefined,
              });
            }
          }
        }

        if (alive) setPool(out);
      } catch (e) {
        console.error("Search preload error:", e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [lang]);

  // Query bo‘yicha takliflar
  const suggestions = useMemo(() => {
    if (!q.trim()) return [];
    return pool
      .filter((p) => textMatches(p.title, q))
      .map((p) => ({ ...p, _score: scoreMatch(p.title, q) }))
      .sort((a, b) => b._score - a._score)
      .slice(0, MAX_SUGGESTIONS);
  }, [q, pool]);

  // Tashqariga bosilganda yopish
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function go(item: SItem) {
    const href = normalizeHref(item.slug || `/${item.sectionId}/${item.categoryId}`);
    router.push(href);
    setOpen(false);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (suggestions[0]) go(suggestions[0]);
  }

  const placeholder = useMemo(
    () => tt("hero.search_placeholder", "Katalog bo‘yicha qidiring…"),
    [tt]
  );
  const loadingText = useMemo(
    () => tt("common.loading", "Yuklanmoqda…"),
    [tt]
  );
  const emptyText = useMemo(
    () => tt("search.no_results", "Hech narsa topilmadi"),
    [tt]
  );
  const ariaSearch = useMemo(
    () => tt("search.aria_button", "Qidirish"),
    [tt]
  );

  return (
    <div ref={wrapRef} className="relative">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={q}
          onChange={(e) => { setQ(e.target.value);setOpen(true); }}
          placeholder={placeholder}
          className="w-full px-4 py-4 rounded-lg pr-12 bg-white outline-none"
          onFocus={() => setOpen(true)}
          aria-expanded={open}
          aria-label={placeholder}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2"
          aria-label={ariaSearch}
          title={ariaSearch}
        >
          <Search className="w-6 h-6 text-gray-900" />
        </button>
      </form>

      {/* Dropdown */}
      {open && q.trim() && (
        <div className="absolute mt-2 left-0 right-0 bg-white rounded-lg shadow-lg border z-20 max-h-96 overflow-auto">
          {loading && pool.length === 0 ? (
            <div className="p-3 text-sm text-gray-500">{loadingText}</div>
          ) : suggestions.length === 0 ? (
            <div className="p-3 text-sm text-gray-500">{emptyText}</div>
          ) : (
            <ul className="divide-y">
              {suggestions.map((s) => (
                <li key={`${s.sectionId}-${s.categoryId}-${s.id}`}>
                  <button
                    type="button"
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 text-left"
                    onClick={() => go(s)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.image || "/placeholder.svg"}
                      alt={s.title}
                      className="w-10 h-10 object-contain"
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{s.title}</div>
                      <div className="text-xs text-gray-500">
                        /{s.sectionId}/{s.categoryId}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
