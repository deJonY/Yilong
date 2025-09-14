// // src/components/product/RelatedProducts.tsx
// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useI18n } from "@/components/i18n/I18nProvider";
// import ProductList, { type Product } from "@/components/cards/first-card";
// import { fetchAllSizeItems, type ItemDoc } from "@/lib/firebase/queries";

// type Props = {
//   sectionId: string;
//   categoryId: string;
//   limit?: number;
// };

// function mapToProduct(sectionId: string, categoryId: string, it: ItemDoc): Product {
//   // build slug with size if available
//   const slug = it._sizeId
//     ? `/${sectionId}/${categoryId}/sizes/${it._sizeId}/${it.id}`
//     : `/${sectionId}/${categoryId}/${it.id}`;
//   return {
//     id: it.id,
//     slug,
//     title: it.title,
//     price: it.price,
//     image: it.image,
//     available: it.available,
//   };
// }

// export default function RelatedProducts({ sectionId, categoryId, limit = 6 }: Props) {
//   const { lang } = useI18n() as any;
//   const [items, setItems] = useState<ItemDoc[]>([]);

//   useEffect(() => {
//     let alive = true;
//     (async () => {
//       try {
//         const all = await fetchAllSizeItems(sectionId, categoryId, 50, lang);
//         if (!alive) return;
//         // shuffle and take 'limit'
//         const shuffled = [...all].sort(() => Math.random() - 0.5).slice(0, limit);
//         setItems(shuffled);
//       } catch (e) {
//         console.error("RelatedProducts error:", e);
//       }
//     })();
//     return () => {
//       alive = false;
//     };
//   }, [sectionId, categoryId, lang, limit]);

//   const products: Product[] = useMemo(
//     () => items.map((it) => mapToProduct(sectionId, categoryId, it)),
//     [items, sectionId, categoryId]
//   );

//   // Localized title
//   const title = useMemo(() => {
//     if (lang === "uz") return "Tasodifiy mahsulotlar";
//     return "Случайные товары";
//   }, [lang]);

//   if (!products.length) return null;

//   return (
//     <section className="mt-10">
//       <h2 className="text-xl font-bold text-gray-800 mb-6">{title}</h2>
//       <ProductList products={products} type="detailed" size="single" />
//     </section>
//   );
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// src/components/product/RelatedProducts.tsx
// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useI18n } from "@/components/i18n/I18nProvider";
// import ProductList, { type Product } from "@/components/cards/first-card";
// import { fetchAllSizeItems, type ItemDoc } from "@/lib/firebase/queries";
// import { LayoutGrid, List } from "lucide-react";

// type Props = {
//   sectionId: string;
//   categoryId: string;
//   limit?: number;
// };

// function mapToProduct(sectionId: string, categoryId: string, it: ItemDoc): Product {
//   const slug = it._sizeId
//     ? `/${sectionId}/${categoryId}/sizes/${it._sizeId}/${it.id}`
//     : `/${sectionId}/${categoryId}/${it.id}`;
//   return {
//     id: it.id,
//     slug,
//     title: it.title,
//     price: it.price,
//     image: it.image,
//     available: it.available,
//   };
// }

// export default function RelatedProducts({ sectionId, categoryId, limit = 6 }: Props) {
//   const { lang } = useI18n() as any;
//   const [layout, setLayout] = useState<"grid" | "list">("grid");
//   const [items, setItems] = useState<ItemDoc[]>([]);

//   useEffect(() => {
//     let alive = true;
//     (async () => {
//       try {
//         const all = await fetchAllSizeItems(sectionId, categoryId, 50, lang);
//         if (!alive) return;
//         const shuffled = [...all].sort(() => Math.random() - 0.5).slice(0, limit);
//         setItems(shuffled);
//       } catch (e) {
//         console.error("RelatedProducts error:", e);
//       }
//     })();
//     return () => { alive = false; };
//   }, [sectionId, categoryId, lang, limit]);

//   const products: Product[] = useMemo(
//     () => items.map((it) => mapToProduct(sectionId, categoryId, it)),
//     [items, sectionId, categoryId]
//   );

//   const title = useMemo(() => (lang === "uz" ? "Tasodifiy mahsulotlar" : "Случайные товары"), [lang]);

//   if (!products.length) return null;

//   return (
//     <section className="mt-10">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-bold text-gray-800">{title}</h2>
//         <div className="flex items-center gap-2">
//           <button
//             className={`p-2 rounded ${layout === "grid" ? "bg-blue-900 text-white" : "bg-slate-200 text-slate-700"}`}
//             onClick={() => setLayout("grid")}
//             aria-label="Grid"
//           >
//             <LayoutGrid className="w-5 h-5" />
//           </button>
//           <button
//             className={`p-2 rounded ${layout === "list" ? "bg-blue-900 text-white" : "bg-slate-200 text-slate-700"}`}
//             onClick={() => setLayout("list")}
//             aria-label="List"
//           >
//             <List className="w-5 h-5" />
//           </button>
//         </div>
//       </div>

//       <ProductList
//         products={products}
//         type="detailed"
//         size={layout === "grid" ? "default" : "single"}
//       />
//     </section>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// src/components/product/RelatedProducts.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import ProductList, { type Product } from "@/components/cards/first-card";
import { fetchAllSizeItems, type ItemDoc } from "@/lib/firebase/queries";
import { LayoutGrid, List } from "lucide-react";

type Props = {
  sectionId: string;
  categoryId: string;
  limit?: number;
};

function mapToProduct(sectionId: string, categoryId: string, it: ItemDoc): Product {
  const slug = it._sizeId
    ? `/${sectionId}/${categoryId}/sizes/${it._sizeId}/${it.id}`
    : `/${sectionId}/${categoryId}/${it.id}`;
  return {
    id: it.id,
    slug,
    title: it.title,
    price: it.price,
    image: it.image,
    available: it.available,
  };
}

export default function RelatedProducts({ sectionId, categoryId, limit = 6 }: Props) {
  const { t, lang } = useI18n() as any;
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [items, setItems] = useState<ItemDoc[]>([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const all = await fetchAllSizeItems(sectionId, categoryId, 50, lang);
        if (!alive) return;
        const shuffled = [...all].sort(() => Math.random() - 0.5).slice(0, limit);
        setItems(shuffled);
      } catch (e) {
        console.error("RelatedProducts error:", e);
      }
    })();
    return () => {
      alive = false;
    };
  }, [sectionId, categoryId, lang, limit]);

  const products: Product[] = useMemo(
    () => items.map((it) => mapToProduct(sectionId, categoryId, it)),
    [items, sectionId, categoryId]
  );

  if (!products.length) return null;

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">{t("related.title")}</h2>
        <div className="flex items-center gap-2">
          <button
            className={`p-2 rounded ${layout === "grid" ? "bg-blue-900 text-white" : "bg-slate-200 text-slate-700"}`}
            onClick={() => setLayout("grid")}
            aria-label="Grid"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            className={`p-2 rounded ${layout === "list" ? "bg-blue-900 text-white" : "bg-slate-200 text-slate-700"}`}
            onClick={() => setLayout("list")}
            aria-label="List"
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      <ProductList products={products} type="detailed" size={layout === "grid" ? "default" : "single"} />
    </section>
  );
}
