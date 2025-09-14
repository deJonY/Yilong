// 'use client';

// import { useEffect, useMemo, useState } from 'react';
// import {
//   fetchSections,
//   fetchCategories,
//   fetchSizes,
//   fetchItemsCat,
//   fetchItemsSize,
// } from '@/lib/firebase/queries';
// import ProductList from '@/components/cards/first-card';
// import { LayoutGrid, List } from 'lucide-react';
// import { useI18n } from '../i18n/I18nProvider';

// type UiItem = {
//   id: string;
//   slug: string;
//   title: string;
//   price: string;
//   image?: string;
//   available?: boolean;
// };

// function shuffle<T>(arr: T[]): T[] {
//   const a = arr.slice();
//   for (let i = a.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [a[i], a[j]] = [a[j], a[i]];
//   }
//   return a;
// }

// /** Grid ko‘rinishidagi skelet kartalar */
// function GridSkeleton({ count = 12 }: { count?: number }) {
//   return (
//     <div className="grid gap-12 grid-cols-1 lg:grid-cols-3">
//       {Array.from({ length: count }).map((_, i) => (
//         <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="p-5">
//             <div className="h-48 w-full rounded bg-slate-200 animate-pulse" />
//           </div>
//           <div className="p-4 space-y-2">
//             <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
//             <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
//             <div className="h-3 w-1/3 bg-slate-200 rounded animate-pulse" />
//           </div>
//           <div className="border-t p-3 flex justify-center">
//             <div className="h-8 w-24 bg-slate-200 rounded animate-pulse" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// /** List (single) ko‘rinishidagi skelet qatorlar */
// function ListSkeleton({ count = 12 }: { count?: number }) {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
//       {Array.from({ length: count }).map((_, i) => (
//         <div key={i} className="flex flex-col md:flex-row items-center gap-6 border-b pb-4 last:border-b-0">
//           <div className="flex-shrink-0 w-32 h-32 md:w-48 md:h-48 bg-slate-200 rounded animate-pulse" />
//           <div className="flex-1 w-full space-y-3">
//             <div className="h-5 w-3/4 bg-slate-200 rounded animate-pulse" />
//             <div className="h-5 w-1/3 bg-slate-200 rounded animate-pulse" />
//             <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
//           </div>
//           <div className="flex-shrink-0 mt-4 md:mt-0 h-10 w-28 bg-slate-200 rounded animate-pulse" />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default function AllProductsRandomClient() {
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState<string | null>(null);
//   const [allItems, setAllItems] = useState<UiItem[]>([]);
//   const [layout, setLayout] = useState<'grid' | 'list'>('grid'); // grid→3 ustun, list→uzuncha
//   const [pageSize, setPageSize] = useState<number>(48);

//   useEffect(() => {
//     let cancelled = false;

//     async function loadAll() {
//       setLoading(true);
//       setErr(null);
//       try {
//         const secs = await fetchSections();
//         const catPromises = secs.map((s) =>
//           fetchCategories(s.id).then((cs) => cs.map((c) => ({ ...c, sectionId: s.id })))
//         );
//         const catGroups = await Promise.all(catPromises);
//         const cats = catGroups.flat();

//         const itemGroups = await Promise.all(
//           cats.map(async (c: any) => {
//             const sizes = await fetchSizes(c.sectionId, c.id);
//             if (sizes.length > 0) {
//               const perSize = await Promise.all(
//                 sizes.map(async (sz) => {
//                   const items = await fetchItemsSize(c.sectionId, c.id, sz.id);
//                   return items.map((it) => ({
//                     id: it.id,
//                     slug: `/${c.sectionId}/${c.id}/sizes/${sz.id}/${it.id}`, // to‘liq yo‘l
//                     title: it.title ?? '',
//                     price: it.price ?? '',
//                     image: it.image,
//                     available: it.available ?? true,
//                   }));
//                 })
//               );
//               return perSize.flat();
//             } else {
//               const list = await fetchItemsCat(c.sectionId, c.id);
//               return list.map((it) => ({
//                 id: it.id,
//                 slug: `/${c.sectionId}/${c.id}/${it.id}`, // to‘liq yo‘l
//                 title: it.title ?? '',
//                 price: it.price ?? '',
//                 image: it.image,
//                 available: it.available ?? true,
//               }));
//             }
//           })
//         );

//         const flat = itemGroups.flat();
//         const randomized = shuffle(flat);

//         if (!cancelled) setAllItems(randomized);
//       } catch (e: any) {
//         if (!cancelled) setErr(e?.message || 'Yuklashda xatolik.');
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     }

//     loadAll();
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   // Har safar pageSize o‘zgarsa — biroz yangilanish hissi uchun qayta shuffle
//   useEffect(() => {
//     if (allItems.length) setAllItems((prev) => shuffle(prev));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [pageSize]);

//   const visible = useMemo(() => allItems.slice(0, pageSize), [allItems, pageSize]);
//   const t = useI18n();

//   return (
//     <section className="mt-10">
//       {/* Toolbar */}
//       <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <label className="text-sm text-slate-700">{t("category.per_page_label")}</label>
//           <select
//             value={pageSize}
//             onChange={(e) => setPageSize(Number(e.target.value))}
//             className="px-2 py-1 rounded bg-slate-200 text-slate-800"
//             disabled={loading}
//           >
//             {[12, 24, 36, 48].map((n) => (
//               <option key={n} value={n}>
//                 {n}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex items-center gap-3">
//           <button
//             className={`p-2 rounded ${layout === 'grid' ? 'bg-blue-900 text-white' : 'bg-slate-200 text-slate-700'}`}
//             onClick={() => setLayout('grid')}
//             aria-label="Grid"
//             disabled={loading}
//           >
//             <LayoutGrid className="w-5 h-5" />
//           </button>
//           <button
//             className={`p-2 rounded ${layout === 'list' ? 'bg-blue-900 text-white' : 'bg-slate-200 text-slate-700'}`}
//             onClick={() => setLayout('list')}
//             aria-label="List"
//             disabled={loading}
//           >
//             <List className="w-5 h-5" />
//           </button>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="mt-6">
//         {loading ? (
//           layout === 'grid' ? (
//             <GridSkeleton count={Math.min(pageSize, 12)} />
//           ) : (
//             <ListSkeleton count={Math.min(pageSize, 12)} />
//           )
//         ) : err ? (
//           <div className="bg-white rounded-lg shadow p-6 text-red-600">{err}</div>
//         ) : visible.length === 0 ? (
//           <div className="bg-white rounded-lg shadow p-6 text-gray-600">Hali hech qanday mahsulot yo‘q.</div>
//         ) : layout === 'grid' ? (
//           <ProductList products={visible as any} type="detailed" size="default" />
//         ) : (
//           <ProductList products={visible as any} type="detailed" size="single" />
//         )}
//       </div>
//     </section>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// src/components/section/AllProductsRandomClient.tsx
// 'use client';

// import { useEffect, useMemo, useState } from 'react';
// import {
//   fetchSections,
//   fetchCategories,
//   fetchSizes,
//   fetchItemsCat,
//   fetchItemsSize,
// } from '@/lib/firebase/queries';
// import ProductList from '@/components/cards/first-card';
// import { LayoutGrid, List } from 'lucide-react';
// import { useI18n } from '@/components/i18n/I18nProvider';

// type UiItem = {
//   id: string;
//   slug: string;
//   title: string;
//   price: string;
//   image?: string;
//   available?: boolean;
// };

// function shuffle<T>(arr: T[]): T[] {
//   const a = arr.slice();
//   for (let i = a.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [a[i], a[j]] = [a[j], a[i]];
//   }
//   return a;
// }

// /** Grid ko‘rinishidagi skelet kartalar */
// function GridSkeleton({ count = 12 }: { count?: number }) {
//   return (
//     <div className="grid gap-12 grid-cols-1 lg:grid-cols-3">
//       {Array.from({ length: count }).map((_, i) => (
//         <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="p-5">
//             <div className="h-48 w-full rounded bg-slate-200 animate-pulse" />
//           </div>
//           <div className="p-4 space-y-2">
//             <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
//             <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
//             <div className="h-3 w-1/3 bg-slate-200 rounded animate-pulse" />
//           </div>
//           <div className="border-t p-3 flex justify-center">
//             <div className="h-8 w-24 bg-slate-200 rounded animate-pulse" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// /** List (single) ko‘rinishidagi skelet qatorlar */
// function ListSkeleton({ count = 12 }: { count?: number }) {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
//       {Array.from({ length: count }).map((_, i) => (
//         <div key={i} className="flex flex-col md:flex-row items-center gap-6 border-b pb-4 last:border-b-0">
//           <div className="flex-shrink-0 w-32 h-32 md:w-48 md:h-48 bg-slate-200 rounded animate-pulse" />
//           <div className="flex-1 w-full space-y-3">
//             <div className="h-5 w-3/4 bg-slate-200 rounded animate-pulse" />
//             <div className="h-5 w-1/3 bg-slate-200 rounded animate-pulse" />
//             <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
//           </div>
//           <div className="flex-shrink-0 mt-4 md:mt-0 h-10 w-28 bg-slate-200 rounded animate-pulse" />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default function AllProductsRandomClient() {
//   const { t /*, lang*/ } = useI18n(); // lang kerak bo'lsa fetch* ga uzatish mumkin
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState<string | null>(null);
//   const [allItems, setAllItems] = useState<UiItem[]>([]);
//   const [layout, setLayout] = useState<'grid' | 'list'>('grid'); // grid→3 ustun, list→uzuncha
//   const [pageSize, setPageSize] = useState<number>(48);

//   useEffect(() => {
//     let cancelled = false;

//     async function loadAll() {
//       setLoading(true);
//       setErr(null);
//       try {
//         const secs = await fetchSections();
//         const catPromises = secs.map((s) =>
//           fetchCategories(s.id).then((cs) => cs.map((c) => ({ ...c, sectionId: s.id })))
//         );
//         const catGroups = await Promise.all(catPromises);
//         const cats = catGroups.flat();

//         const itemGroups = await Promise.all(
//           cats.map(async (c: any) => {
//             const sizes = await fetchSizes(c.sectionId, c.id);
//             if (sizes.length > 0) {
//               const perSize = await Promise.all(
//                 sizes.map(async (sz) => {
//                   const items = await fetchItemsSize(c.sectionId, c.id, sz.id /*, lang*/);
//                   return items.map((it) => ({
//                     id: it.id,
//                     slug: `/${c.sectionId}/${c.id}/sizes/${sz.id}/${it.id}`,
//                     title: it.title ?? '',
//                     price: it.price ?? '',
//                     image: it.image,
//                     available: it.available ?? true,
//                   }));
//                 })
//               );
//               return perSize.flat();
//             } else {
//               const list = await fetchItemsCat(c.sectionId, c.id /*, lang*/);
//               return list.map((it) => ({
//                 id: it.id,
//                 slug: `/${c.sectionId}/${c.id}/${it.id}`,
//                 title: it.title ?? '',
//                 price: it.price ?? '',
//                 image: it.image,
//                 available: it.available ?? true,
//               }));
//             }
//           })
//         );

//         const flat = itemGroups.flat();
//         const randomized = shuffle(flat);

//         if (!cancelled) setAllItems(randomized);
//       } catch (e: any) {
//         if (!cancelled) setErr(e?.message || t('order.error_network'));
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     }

//     loadAll();
//     return () => {
//       cancelled = true;
//     };
//     // lang ni qo'shish mumkin, fetch* lang qabul qilsa:
//     // }, [lang]);
//   }, [t]);

//   // Har safar pageSize o‘zgarsa — biroz yangilanish hissi uchun qayta shuffle
//   useEffect(() => {
//     if (allItems.length) setAllItems((prev) => shuffle(prev));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [pageSize]);

//   const visible = useMemo(() => allItems.slice(0, pageSize), [allItems, pageSize]);

//   return (
//     <section className="mt-10">
//       {/* Toolbar */}
//       <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <label className="text-sm text-slate-700">{t('category.per_page_label')}</label>
//           <select
//             value={pageSize}
//             onChange={(e) => setPageSize(Number(e.target.value))}
//             className="px-2 py-1 rounded bg-slate-200 text-slate-800"
//             disabled={loading}
//           >
//             {[12, 24, 36, 48].map((n) => (
//               <option key={n} value={n}>
//                 {n}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex items-center gap-3">
//           <button
//             className={`p-2 rounded ${layout === 'grid' ? 'bg-blue-900 text-white' : 'bg-slate-200 text-slate-700'}`}
//             onClick={() => setLayout('grid')}
//             aria-label="Grid"
//             disabled={loading}
//           >
//             <LayoutGrid className="w-5 h-5" />
//           </button>
//           <button
//             className={`p-2 rounded ${layout === 'list' ? 'bg-blue-900 text-white' : 'bg-slate-200 text-slate-700'}`}
//             onClick={() => setLayout('list')}
//             aria-label="List"
//             disabled={loading}
//           >
//             <List className="w-5 h-5" />
//           </button>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="mt-6">
//         {loading ? (
//           layout === 'grid' ? (
//             <GridSkeleton count={Math.min(pageSize, 12)} />
//           ) : (
//             <ListSkeleton count={Math.min(pageSize, 12)} />
//           )
//         ) : err ? (
//           <div className="bg-white rounded-lg shadow p-6 text-red-600">{err}</div>
//         ) : visible.length === 0 ? (
//           <div className="bg-white rounded-lg shadow p-6 text-gray-600">{t('category.products.empty')}</div>
//         ) : layout === 'grid' ? (
//           <ProductList products={visible as any} type="detailed" size="default" />
//         ) : (
//           <ProductList products={visible as any} type="detailed" size="single" />
//         )}
//       </div>
//     </section>
//   );
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  fetchSections,
  fetchCategories,
  fetchSizes,
  fetchItemsCat,
  fetchItemsSize,
} from '@/lib/firebase/queries';
import ProductList from '@/components/cards/first-card';
import { LayoutGrid, List } from 'lucide-react';
import { useI18n } from '@/components/i18n/I18nProvider';

type UiItem = {
  id: string;
  slug: string;
  title: string;
  price: string;
  image?: string;
  available?: boolean;
};

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function GridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid gap-12 grid-cols-1 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-5"><div className="h-48 w-full rounded bg-slate-200 animate-pulse" /></div>
          <div className="p-4 space-y-2">
            <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
            <div className="h-3 w-1/3 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="border-t p-3 flex justify-center">
            <div className="h-8 w-24 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ListSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col md:flex-row items-center gap-6 border-b pb-4 last:border-b-0">
          <div className="flex-shrink-0 w-32 h-32 md:w-48 md:h-48 bg-slate-200 rounded animate-pulse" />
          <div className="flex-1 w-full space-y-3">
            <div className="h-5 w-3/4 bg-slate-200 rounded animate-pulse" />
            <div className="h-5 w-1/3 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="flex-shrink-0 mt-4 md:mt-0 h-10 w-28 bg-slate-200 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export default function AllProductsRandomClient() {
  const { t } = useI18n();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [allItems, setAllItems] = useState<UiItem[]>([]);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [pageSize, setPageSize] = useState<number>(48);

  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      setLoading(true);
      setErr(null);
      try {
        const secs = await fetchSections();
        const catGroups = await Promise.all(
          secs.map((s) => fetchCategories(s.id).then((cs) => cs.map((c) => ({ ...c, sectionId: s.id }))))
        );
        const cats = catGroups.flat();

        const itemGroups = await Promise.all(
          cats.map(async (c: any) => {
            const sizes = await fetchSizes(c.sectionId, c.id);
            if (sizes.length > 0) {
              const perSize = await Promise.all(
                sizes.map(async (sz) => {
                  const items = await fetchItemsSize(c.sectionId, c.id, sz.id);
                  return items.map((it) => ({
                    id: it.id,
                    slug: `/${c.sectionId}/${c.id}/sizes/${sz.id}/${it.id}`,
                    title: it.title ?? '',
                    price: it.price ?? '',
                    image: it.image,
                    available: it.available ?? true,
                  }));
                })
              );
              return perSize.flat();
            } else {
              const list = await fetchItemsCat(c.sectionId, c.id);
              return list.map((it) => ({
                id: it.id,
                slug: `/${c.sectionId}/${c.id}/${it.id}`,
                title: it.title ?? '',
                price: it.price ?? '',
                image: it.image,
                available: it.available ?? true,
              }));
            }
          })
        );

        const randomized = shuffle(itemGroups.flat());
        if (!cancelled) setAllItems(randomized);
      } catch (e: any) {
        if (!cancelled) setErr(t("common.load_error"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadAll();
    return () => { cancelled = true; };
  }, [t]);

  useEffect(() => {
    if (allItems.length) setAllItems((prev) => shuffle(prev));
  }, [pageSize]); // eslint-disable-line

  const visible = useMemo(() => allItems.slice(0, pageSize), [allItems, pageSize]);

  return (
    <section className="mt-10">
      {/* Toolbar */}
      <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="text-sm text-slate-700">{t("category.per_page_label")}</label>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="px-2 py-1 rounded bg-slate-200 text-slate-800"
            disabled={loading}
          >
            {[12, 24, 36, 48].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button
            className={`p-2 rounded ${layout === 'grid' ? 'bg-blue-900 text-white' : 'bg-slate-200 text-slate-700'}`}
            onClick={() => setLayout('grid')}
            aria-label="Grid"
            disabled={loading}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            className={`p-2 rounded ${layout === 'list' ? 'bg-blue-900 text-white' : 'bg-slate-200 text-slate-700'}`}
            onClick={() => setLayout('list')}
            aria-label="List"
            disabled={loading}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mt-6">
        {loading ? (
          layout === 'grid' ? <GridSkeleton count={Math.min(pageSize, 12)} /> : <ListSkeleton count={Math.min(pageSize, 12)} />
        ) : err ? (
          <div className="bg-white rounded-lg shadow p-6 text-red-600">{err}</div>
        ) : visible.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-gray-600">{t("category.products.empty")}</div>
        ) : layout === 'grid' ? (
          <ProductList products={visible as any} type="detailed" size="default" />
        ) : (
          <ProductList products={visible as any} type="detailed" size="single" />
        )}
      </div>
    </section>
  );
}
