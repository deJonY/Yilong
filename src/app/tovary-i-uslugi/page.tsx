// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import {
//   fetchSections,
//   fetchCategories,
//   getCategoryImage,
// } from '@/lib/firebase/queries';
// import CategoryLayout from '@/components/CategoryLayout';
// import AllProductsRandomClient from '@/components/section/AllProductsRandomClient';
// import { useI18n } from '@/components/i18n/I18nProvider';

// type Section = { id: string; title: string };
// type Card = { id: string; title: string; image?: string };

// function SectionCard({ title, image, href }: { title: string; image?: string; href: string }) {
//   return (
//     <Link
//       href={href}
//       className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
//     >
//       <div className="overflow-hidden p-5">
//         <img
//           src={image || '/placeholder.svg'}
//           alt={title}
//           className="w-full h-48 object-contain rounded"
//         />
//       </div>
//       <div className="p-4">
//         <h3 className="font-semibold text-gray-800 text-center">{title}</h3>
//       </div>
//     </Link>
//   );
// }

// /** Skeleton loader: 6 ta karta ko'rinishida */
// function SectionsSkeleton() {
//   return (
//     <div
//       className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
//       aria-busy="true"
//       aria-live="polite"
//     >
//       {Array.from({ length: 6 }).map((_, i) => (
//         <div
//           key={i}
//           className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
//         >
//           <div className="p-5">
//             <div className="h-48 w-full rounded bg-slate-200 animate-pulse" />
//           </div>
//           <div className="p-4 space-y-2">
//             <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
//             <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
//             <div className="h-3 w-2/3 bg-slate-200 rounded animate-pulse" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// function AllSectionsClient() {
//   const [loading, setLoading] = useState(true);
//   const [cards, setCards] = useState<Card[]>([]);
//   const [err, setErr] = useState<string | null>(null);

//   useEffect(() => {
//     let cancelled = false;
//     (async () => {
//       setLoading(true);
//       setErr(null);
//       try {
//         const secs = await fetchSections();
//         const withCovers: Card[] = [];
//         for (const s of secs) {
//           const cats = await fetchCategories(s.id);
//           let cover: string | undefined;
//           for (const c of cats) {
//             cover = await getCategoryImage(s.id, c.id);
//             if (cover) break;
//           }
//           withCovers.push({ id: s.id, title: s.title, image: cover });
//         }
//         if (!cancelled) setCards(withCovers);
//       } catch (e: any) {
//         if (!cancelled) setErr(e?.message || 'Yuklashda xatolik.');
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     })();
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   if (loading) return <SectionsSkeleton />;
//   if (err)
//     return (
//       <div className="bg-white rounded-lg shadow p-6 text-red-600">
//         {err}
//       </div>
//     );

//   return (
//     <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//       {cards.map((c) => (
//         <SectionCard key={c.id} title={c.title} image={c.image} href={`/${c.id}`} />
//       ))}
//     </div>
//   );
// }

// export default function TovaryIUsugiPage() {
//   // return (
//   //   <CategoryLayout title="Товары и услуги">
//   //     {/* 1) Bo‘limlar grid */}
//   //     <AllSectionsClient />

//   //     {/* 2) Pastida — barcha bo‘lim/kategoriyalardan RANDOM tovarlar + ko‘rinish/soni paneli */}
//   //     <AllProductsRandomClient />
//   //   </CategoryLayout>
//   // );

//    const { t } = useI18n();
//   return (
//     <CategoryLayout title={t("nav.products")}>
//       <AllSectionsClient />
//       <AllProductsRandomClient />
//     </CategoryLayout>
//   );
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// app/tovary-i-uslugi/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import {
//   fetchSections,
//   fetchCategories,
//   getCategoryImage,
// } from '@/lib/firebase/queries';
// import CategoryLayout from '@/components/CategoryLayout';
// import AllProductsRandomClient from '@/components/section/AllProductsRandomClient';
// import { useI18n } from '@/components/i18n/I18nProvider';

// type Section = { id: string; title: string };
// type Card = { id: string; title: string; image?: string };

// function SectionCard({ title, image, href }: { title: string; image?: string; href: string }) {
//   return (
//     <Link
//       href={href}
//       className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
//     >
//       <div className="overflow-hidden p-5">
//         <img
//           src={image || '/placeholder.svg'}
//           alt={title}
//           className="w-full h-48 object-contain rounded"
//         />
//       </div>
//       <div className="p-4">
//         <h3 className="font-semibold text-gray-800 text-center">{title}</h3>
//       </div>
//     </Link>
//   );
// }

// /** Skeleton loader: 6 ta karta ko'rinishida */
// function SectionsSkeleton() {
//   return (
//     <div
//       className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
//       aria-busy="true"
//       aria-live="polite"
//     >
//       {Array.from({ length: 6 }).map((_, i) => (
//         <div
//           key={i}
//           className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
//         >
//           <div className="p-5">
//             <div className="h-48 w-full rounded bg-slate-200 animate-pulse" />
//           </div>
//           <div className="p-4 space-y-2">
//             <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
//             <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
//             <div className="h-3 w-2/3 bg-slate-200 rounded animate-pulse" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// function AllSectionsClient() {
//   const [loading, setLoading] = useState(true);
//   const [cards, setCards] = useState<Card[]>([]);
//   const [err, setErr] = useState<string | null>(null);

//   useEffect(() => {
//     let cancelled = false;
//     (async () => {
//       setLoading(true);
//       setErr(null);
//       try {
//         const secs = await fetchSections();
//         const withCovers: Card[] = [];
//         for (const s of secs) {
//           const cats = await fetchCategories(s.id);
//           let cover: string | undefined;
//           for (const c of cats) {
//             cover = await getCategoryImage(s.id, c.id);
//             if (cover) break;
//           }
//           withCovers.push({ id: s.id, title: s.title, image: cover });
//         }
//         if (!cancelled) setCards(withCovers);
//       } catch (e: any) {
//         if (!cancelled) setErr(e?.message || 'Yuklashda xatolik.');
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     })();
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   if (loading) return <SectionsSkeleton />;
//   if (err)
//     return (
//       <div className="bg-white rounded-lg shadow p-6 text-red-600">
//         {err}
//       </div>
//     );

//   return (
//     <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//       {cards.map((c) => (
//         <SectionCard key={c.id} title={c.title} image={c.image} href={`/${c.id}`} />
//       ))}
//     </div>
//   );
// }

// export default function TovaryIUsugiPage() {
//   // return (
//   //   <CategoryLayout title="Товары и услуги">
//   //     {/* 1) Bo‘limlar grid */}
//   //     <AllSectionsClient />

//   //     {/* 2) Pastida — barcha bo‘lim/kategoriyalardan RANDOM tovarlar + ko‘rinish/soni paneli */}
//   //     <AllProductsRandomClient />
//   //   </CategoryLayout>
//   // );

//    const { t } = useI18n();
//   return (
//     <CategoryLayout title={t("nav.products")}>
//       <AllSectionsClient />
//       <AllProductsRandomClient />
//     </CategoryLayout>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  fetchSections,
  fetchCategories,
  getCategoryImage,
} from '@/lib/firebase/queries';
import CategoryLayout from '@/components/CategoryLayout';
import AllProductsRandomClient from '@/components/section/AllProductsRandomClient';
import { useI18n } from '@/components/i18n/I18nProvider';
import { getSectionTitle } from '@/lib/catalog';

type Card = { id: string; image?: string };

function SectionCard({ title, image, href }: { title: string; image?: string; href: string }) {
  return (
    <Link
      href={href}
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
    >
      <div className="overflow-hidden p-5">
        <img
          src={image || '/placeholder.svg'}
          alt={title}
          className="w-full h-48 object-contain rounded"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-center">{title}</h3>
      </div>
    </Link>
  );
}

/** Skeleton loader: 6 ta karta ko'rinishida */
function SectionsSkeleton() {
  return (
    <div
      className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-live="polite"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
        >
          <div className="p-5">
            <div className="h-48 w-full rounded bg-slate-200 animate-pulse" />
          </div>
          <div className="p-4 space-y-2">
            <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
            <div className="h-3 w-2/3 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

function AllSectionsClient() {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<Card[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const { t, lang } = useI18n();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const secs = await fetchSections(); // [{id, title}] — title'ni endi ishlatmaymiz
        const withCovers: Card[] = [];
        for (const s of secs) {
          const cats = await fetchCategories(s.id);
          let cover: string | undefined;
          for (const c of cats) {
            cover = await getCategoryImage(s.id, c.id);
            if (cover) break;
          }
          withCovers.push({ id: s.id, image: cover });
        }
        if (!cancelled) setCards(withCovers);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message || 'Yuklashda xatolik.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <SectionsSkeleton />;
  if (err)
    return (
      <div className="bg-white rounded-lg shadow p-6 text-red-600">
        {err}
      </div>
    );

  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => {
        // Sidebar bilan bir xil tarjima:
        // 1) t('catalog.sections.<id>.title') -> 2) getSectionTitle(<id>, lang) -> 3) <id>
        const key = `catalog.sections.${c.id}.title`;
        const fromDict = t(key);
        const title =
          (typeof fromDict === 'string' && !fromDict.startsWith('catalog.'))
            ? fromDict
            : getSectionTitle(c.id, lang) || c.id;

        return (
          <SectionCard
            key={c.id}
            title={title}
            image={c.image}
            href={`/${c.id}`}
          />
        );
      })}
    </div>
  );
}

export default function TovaryIUsugiPage() {
  const { t } = useI18n();
  return (
    <CategoryLayout title={t('nav.products')}>
      {/* 1) Katalog bo‘limlari grid */}
      <AllSectionsClient />
      {/* 2) Pastida — barcha bo‘lim/kategoriyalardan RANDOM tovarlar */}
      <AllProductsRandomClient />
    </CategoryLayout>
  );
}
