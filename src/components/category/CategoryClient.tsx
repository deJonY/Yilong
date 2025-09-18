// // src/components/category/CategoryClient.tsx
// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import {
//   fetchSizes,
//   fetchItemsCat,
//   fetchItemsSize,
//   fetchAllSizeItems,
//   getCategoryImage,
//   fetchSectionTitle,
//   fetchCategoryTitle,
// } from "@/lib/firebase/queries";
// import ProductList from "@/components/cards/first-card";
// import { useI18n } from "@/components/i18n/I18nProvider";
// import Breadcrumbs from "@/components/nav/Breadcrumbs";
// import { CardSkeleton } from "@/components/ui/skeleton";
// import { LayoutGrid, List } from "lucide-react";

// type SizeDoc = { id: string; name: string; size: string; image?: string };
// type FBItem = {
//   id: string;
//   title: string;
//   image?: string;
//   price: string;
//   description?: string;
//   available?: boolean;
//   _sizeId?: string; // fetchAllSizeItems orqali keladi
// };
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
// function joinNameSize(name?: string, size?: string) {
//   const s = (size ?? "").trim();
//   const sizeText = s ? (/^[\(\[]/.test(s) ? s : `(${s})`) : "";
//   return [name, sizeText].filter(Boolean).join(" ");
// }

// export default function CategoryClient({
//   sectionId,
//   categoryId,
// }: {
//   sectionId: string;
//   categoryId: string;
// }) {
//   const router = useRouter();
//   const search = useSearchParams();
//   const pickedSizeId = search.get("size"); // ?size=abc
//   const { t /*, lang */} = useI18n();

//   const [sizes, setSizes] = useState<SizeDoc[]>([]);
//   const [catImage, setCatImage] = useState<string | null>(null);
//   const [items, setItems] = useState<FBItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [sectionTitle, setSectionTitle] = useState<string>(sectionId);
//   const [categoryTitle, setCategoryTitle] = useState<string>(categoryId);

//   // === Toolbar: sahifadagi son + layout (AllProductsRandomClient bilan mos)
//   const [pageSize, setPageSize] = useState<number | "all">(12);
//   const [layout, setLayout] = useState<"grid" | "list">("grid");

//   // Titles (section & category)
//   useEffect(() => {
//     let alive = true;
//     (async () => {
//       try {
//         const [secTitle, catTitle] = await Promise.all([
//           fetchSectionTitle(sectionId),
//           fetchCategoryTitle(sectionId, categoryId),
//         ]);
//         if (!alive) return;
//         setSectionTitle(secTitle);
//         setCategoryTitle(catTitle);
//       } catch {}
//     })();
//     return () => {
//       alive = false;
//     };
//   }, [sectionId, categoryId]);

//   // Ma'lumotlarni yuklash
//   useEffect(() => {
//     let alive = true;
//     (async () => {
//       setLoading(true);
//       try {
//         const [sz, cimg] = await Promise.all([
//           fetchSizes(sectionId, categoryId),
//           getCategoryImage(sectionId, categoryId),
//         ]);

//         if (!alive) return;
//         setSizes(sz);
//         setCatImage(cimg || null);

//         let prods: FBItem[] = [];
//         if (sz.length > 0) {
//           prods = pickedSizeId
//             ? await fetchItemsSize(sectionId, categoryId, pickedSizeId)
//             : await fetchAllSizeItems(sectionId, categoryId);
//         } else {
//           prods = await fetchItemsCat(sectionId, categoryId);
//         }

//         // random chiqsin
//         prods = shuffle(prods);

//         if (!alive) return;
//         setItems(prods);
//       } catch (e) {
//         console.error("[category] load error:", e);
//       } finally {
//         if (alive) setLoading(false);
//       }
//     })();

//     return () => {
//       alive = false;
//     };
//   }, [sectionId, categoryId, pickedSizeId]);

//   // UI-ga moslab mahsulotlarni tayyorlash (URL bilan)
//   const products: UiItem[] = useMemo(() => {
//     return items.map((it) => {
//       const sizeForUrl = pickedSizeId || it._sizeId;
//       const href = sizeForUrl
//         ? `/${sectionId}/${categoryId}/sizes/${sizeForUrl}/${it.id}`
//         : `/${sectionId}/${categoryId}/${it.id}`;
//       return {
//         id: it.id,
//         slug: href, // <-- absolyut
//         title: it.title ?? "",
//         price: it.price ?? "",
//         image: it.image,
//         available: it.available ?? true,
//       };
//     });
//   }, [items, sectionId, categoryId, pickedSizeId]);

//   // “sahifadagi” — AllProductsRandomClient’dagi kabi: shunchaki birinchi N ta
//   const visible = useMemo(
//     () => (pageSize === "all" ? products : products.slice(0, pageSize)),
//     [products, pageSize]
//   );

//   const pickSize = (id?: string) => {
//     const base = `/${sectionId}/${categoryId}`;
//     router.push(id ? `${base}?size=${id}` : base);
//   };

//   // Breadcrumbs
//   const rawCatalog = t("breadcrumbs.catalog");
//   const catalogLabel =
//     rawCatalog && rawCatalog !== "breadcrumbs.catalog"
//       ? rawCatalog
//       : t("nav.products");

//   const szLabel = useMemo(() => {
//     if (!pickedSizeId) return null;
//     const s = sizes.find((z) => z.id === pickedSizeId);
//     return s ? joinNameSize(s.name, s.size) : null;
//   }, [sizes, pickedSizeId]);

//   const crumbs = [
//     { label: catalogLabel, href: "/" },
//     { label: sectionTitle, href: `/${sectionId}` },
//     { label: categoryTitle, href: `/${sectionId}/${categoryId}` },
//   ] as { label: string; href?: string }[];
//   if (szLabel) crumbs.push({ label: szLabel });

//   return (
//     <div className="space-y-10">
//       <Breadcrumbs items={crumbs} />

//       {/* Sizes grid */}
//       {!!sizes.length && (
//         <div>
//           <h3 className="text-xl font-semibold mb-4">
//             {t("category.sizes.title")}
//           </h3>

//           {loading ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {Array.from({ length: 6 }).map((_, i) => (
//                 <CardSkeleton key={i} />
//               ))}
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {sizes.map((s) => (
//                 <button
//                   key={s.id}
//                   onClick={() => pickSize(s.id)}
//                   className={`text-left bg-white rounded-lg shadow hover:shadow-lg transition p-4 border
//                   ${
//                     pickedSizeId === s.id
//                       ? "border-blue-600"
//                       : "border-transparent"
//                   }`}
//                   title={`${s.name} — ${s.size}`}
//                   aria-pressed={pickedSizeId === s.id}
//                 >
//                   {/* eslint-disable-next-line @next/next/no-img-element */}
//                   <img
//                     loading="lazy"
//                     src={s.image || catImage || "/placeholder.png"}
//                     alt={s.name}
//                     className="w-full h-40 object-cover rounded mb-3"
//                   />
//                   <div className="text-gray-800 font-semibold">{s.name}</div>
//                   <div className="text-gray-600">{s.size}</div>
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Products + toolbar (AllProductsRandomClient bilan mos) */}
//       <div className="space-y-4">
//         <h3 className="text-xl font-semibold">
//           {pickedSizeId
//             ? t("category.products.heading_selected")
//             : sizes.length
//             ? t("category.products.heading_all")
//             : t("category.products.heading_plain")}
//         </h3>

//         {!loading && products.length > 0 && (
//           <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <label className="text-sm text-slate-700">
//                 {t("category.per_page_label")}
//               </label>
//               {/* <select
//                 value={String(pageSize)}
//                 onChange={(e) =>
//                   setPageSize(
//                     e.target.value === "all" ? "all" : Number(e.target.value)
//                   )
//                 }
//                 className="px-2 py-1 rounded bg-slate-200 text-slate-800"
//               >
//                 {[8, 12, 24].map((n) => (
//                   <option key={n} value={n}>
//                     {n}
//                   </option>
//                 ))}
//                 <option value="all">all</option>
//               </select> */}

//               <select
//                 value={String(pageSize)}
//                 onChange={(e) => setPageSize(e.target.value === "all" ? "all" : Number(e.target.value))}
//                 className="px-2 py-1 rounded bg-slate-200 text-slate-800"
//               >
//                 {[8, 12, 24].map((n) => <option key={n} value={n}>{n}</option>)}
//                 <option value="all">{t("common.all")}</option>
//               </select>
//             </div>

//             <div className="flex items-center gap-3">
//               <button
//                 className={`p-2 rounded ${
//                   layout === "grid"
//                     ? "bg-blue-900 text-white"
//                     : "bg-slate-200 text-slate-700"
//                 }`}
//                 onClick={() => setLayout("grid")}
//                 aria-label="Grid"
//               >
//                 <LayoutGrid className="w-5 h-5" />
//               </button>
//               <button
//                 className={`p-2 rounded ${
//                   layout === "list"
//                     ? "bg-blue-900 text-white"
//                     : "bg-slate-200 text-slate-700"
//                 }`}
//                 onClick={() => setLayout("list")}
//                 aria-label="List"
//               >
//                 <List className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Products */}
//         {loading ? (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//             {Array.from({ length: 6 }).map((_, i) => (
//               <CardSkeleton key={i} />
//             ))}
//           </div>
//         ) : products.length ? (
//           layout === "grid" ? (
//             <ProductList products={visible} type="detailed" size="default" />
//           ) : (
//             <ProductList products={visible} type="detailed" size="single" />
//           )
//         ) : (
//           <div className="bg-white rounded-lg shadow p-6 text-gray-600">
//             {t("category.products.empty")}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  fetchSizes,
  fetchItemsCat,
  fetchItemsSize,
  fetchAllSizeItems,
  getCategoryImage,
  fetchSectionTitle,
  fetchCategoryTitle,
} from "@/lib/firebase/queries";
import ProductList from "@/components/cards/first-card";
import { useI18n } from "@/components/i18n/I18nProvider";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { CardSkeleton } from "@/components/ui/skeleton";
import { LayoutGrid, List } from "lucide-react";

type SizeDoc = { id: string; name: string; size: string; image?: string };
type FBItem = {
  id: string;
  title: string;
  image?: string;
  price: string;
  description?: string;
  available?: boolean;
  _sizeId?: string; // fetchAllSizeItems orqali keladi
};
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
function joinNameSize(name?: string, size?: string) {
  const s = (size ?? "").trim();
  const sizeText = s ? (/^[\(\[]/.test(s) ? s : `(${s})`) : "";
  return [name, sizeText].filter(Boolean).join(" ");
}

export default function CategoryClient({
  sectionId,
  categoryId,
}: {
  sectionId: string;
  categoryId: string;
}) {
  const router = useRouter();
  const search = useSearchParams();
  const pickedSizeId = search.get("size"); // ?size=abc
  const { t /*, lang */} = useI18n();

  const [sizes, setSizes] = useState<SizeDoc[]>([]);
  const [catImage, setCatImage] = useState<string | null>(null);
  const [items, setItems] = useState<FBItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [sectionTitle, setSectionTitle] = useState<string>(sectionId);
  const [categoryTitle, setCategoryTitle] = useState<string>(categoryId);

  // === Toolbar: sahifadagi son + layout (AllProductsRandomClient bilan mos)
  const [pageSize, setPageSize] = useState<number | "all">(12);
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  // Titles (section & category)
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [secTitle, catTitle] = await Promise.all([
          fetchSectionTitle(sectionId),
          fetchCategoryTitle(sectionId, categoryId),
        ]);
        if (!alive) return;
        setSectionTitle(secTitle);
        setCategoryTitle(catTitle);
      } catch {}
    })();
    return () => {
      alive = false;
    };
  }, [sectionId, categoryId]);

  // Ma'lumotlarni yuklash
  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const [sz, cimg] = await Promise.all([
          fetchSizes(sectionId, categoryId),
          getCategoryImage(sectionId, categoryId),
        ]);

        if (!alive) return;
        setSizes(sz);
        setCatImage(cimg || null);

        let prods: FBItem[] = [];
        if (sz.length > 0) {
          prods = pickedSizeId
            ? await fetchItemsSize(sectionId, categoryId, pickedSizeId)
            : await fetchAllSizeItems(sectionId, categoryId);
        } else {
          prods = await fetchItemsCat(sectionId, categoryId);
        }

        // random chiqsin
        prods = shuffle(prods);

        if (!alive) return;
        setItems(prods);
      } catch (e) {
        console.error("[category] load error:", e);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [sectionId, categoryId, pickedSizeId]);

  // UI-ga moslab mahsulotlarni tayyorlash (URL bilan)
  const products: UiItem[] = useMemo(() => {
    return items.map((it) => {
      const sizeForUrl = pickedSizeId || it._sizeId;
      const href = sizeForUrl
        ? `/${sectionId}/${categoryId}/sizes/${sizeForUrl}/${it.id}`
        : `/${sectionId}/${categoryId}/${it.id}`;
      return {
        id: it.id,
        slug: href, // <-- absolyut
        title: it.title ?? "",
        price: it.price ?? "",
        image: it.image,
        available: it.available ?? true,
      };
    });
  }, [items, sectionId, categoryId, pickedSizeId]);

  // “sahifadagi” — AllProductsRandomClient’dagi kabi: shunchaki birinchi N ta
  const visible = useMemo(
    () => (pageSize === "all" ? products : products.slice(0, pageSize)),
    [products, pageSize]
  );

  const pickSize = (id?: string) => {
    const base = `/${sectionId}/${categoryId}`;
    router.push(id ? `${base}?size=${id}` : base);
  };

  // Breadcrumbs
  const rawCatalog = t("breadcrumbs.catalog");
  const catalogLabel =
    rawCatalog && rawCatalog !== "breadcrumbs.catalog"
      ? rawCatalog
      : t("nav.products");

  const szLabel = useMemo(() => {
    if (!pickedSizeId) return null;
    const s = sizes.find((z) => z.id === pickedSizeId);
    return s ? joinNameSize(s.name, s.size) : null;
  }, [sizes, pickedSizeId]);

  const crumbs = [
    { label: catalogLabel, href: "/" },
    { label: sectionTitle, href: `/${sectionId}` },
    { label: categoryTitle, href: `/${sectionId}/${categoryId}` },
  ] as { label: string; href?: string }[];
  if (szLabel) crumbs.push({ label: szLabel });

  return (
    <div className="space-y-10">
      <Breadcrumbs items={crumbs} />

      {/* Sizes grid */}
      {!!sizes.length && (
        <div>
          <h3 className="text-xl font-semibold mb-4">
            {t("category.sizes.title")}
          </h3>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sizes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => pickSize(s.id)}
                  className={`text-left bg-white rounded-lg shadow hover:shadow-lg transition p-4 border
                  ${
                    pickedSizeId === s.id
                      ? "border-blue-600"
                      : "border-transparent"
                  }`}
                  title={`${s.name} — ${s.size}`}
                  aria-pressed={pickedSizeId === s.id}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    loading="lazy"
                    src={s.image || catImage || "/placeholder.png"}
                    alt={s.name}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <div className="text-gray-800 font-semibold">{s.name}</div>
                  <div className="text-gray-600">{s.size}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Products + toolbar */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">
          {pickedSizeId
            ? t("category.products.heading_selected")
            : sizes.length
            ? t("category.products.heading_all")
            : t("category.products.heading_plain")}
        </h3>

        {!loading && products.length > 0 && (
          <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="text-sm text-slate-700">
                {t("category.per_page_label")}
              </label>

              <select
                value={String(pageSize)}
                onChange={(e) =>
                  setPageSize(
                    e.target.value === "all" ? "all" : Number(e.target.value)
                  )
                }
                className="px-2 py-1 rounded bg-slate-200 text-slate-800"
              >
                {[8, 12, 24].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
                <option value="all">{t("common.all")}</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <button
                className={`p-2 rounded ${
                  layout === "grid"
                    ? "bg-blue-900 text-white"
                    : "bg-slate-200 text-slate-700"
                }`}
                onClick={() => setLayout("grid")}
                aria-label={t("category.toolbar.grid")}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                className={`p-2 rounded ${
                  layout === "list"
                    ? "bg-blue-900 text-white"
                    : "bg-slate-200 text-slate-700"
                }`}
                onClick={() => setLayout("list")}
                aria-label={t("category.toolbar.list")}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Products */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : products.length ? (
          layout === "grid" ? (
            <ProductList products={visible} type="detailed" size="default" />
          ) : (
            <ProductList products={visible} type="detailed" size="single" />
          )
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-gray-600">
            {t("category.products.empty")}
          </div>
        )}
      </div>
    </div>
  );
}
