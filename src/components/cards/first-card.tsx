// // src/components/cards/first-card.tsx
// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useI18n } from "@/components/i18n/I18nProvider";

// // Firestore helpers
// import { fetchCategories, getCategoryImage } from "@/lib/firebase/queries";
// // Hover matnlar (sect -> cat -> text)
// import MAIN_RU from "@/data/main.json";
// import MAIN_UZ from "@/data/main.uz.json";

// /* ───────── TYPES ───────── */
// export type Product = {
//   id: string | number;
//   slug: string;                 // to'liq yoki nisbiy bo'lishi mumkin — normalize qilamiz
//   title: string;
//   price: string;
//   image?: string;
//   available?: boolean;
//   showAsFirstCard?: boolean;
// };

// type ProductListProps = {
//   // products rejimi uchun
//   products?: Product[];
//   size?: "default" | "single";
//   type?: "detailed" | "simple";

//   // categories rejimi uchun
//   mode?: "products" | "categories";
//   sectionId?: string;
// };

// /* ───────── Sales helpers (localStorage) ───────── */
// function readSales(): Record<string, number> {
//   try {
//     const raw = localStorage.getItem("sales");
//     return raw ? JSON.parse(raw) : {};
//   } catch {
//     return {};
//   }
// }
// function writeSales(map: Record<string, number>) {
//   localStorage.setItem("sales", JSON.stringify(map));
//   window.dispatchEvent(new Event("storage"));
// }
// function persistCartMeta(p: Product) {
//   try {
//     const raw = localStorage.getItem("sales_meta");
//     const meta = raw ? JSON.parse(raw) : {};
//     const id = String(p.id);
//     meta[id] = {
//       title: p.title,
//       price: p.price,
//       image: p.image || meta[id]?.image || "",
//     };
//     localStorage.setItem("sales_meta", JSON.stringify(meta));
//     window.dispatchEvent(new Event("storage"));
//   } catch { /* ignore */ }
// }

// /* ───────── URL normalizatsiya ───────── */
// function normalizeHref(slug?: string) {
//   if (!slug) return "#";
//   let s = slug.trim();

//   // Eski yo'llar: product/ prefiksini tashlaymiz
//   s = s.replace(/^product\//i, "");

//   // Agar tashqi URL bermagan bo‘lsangiz, har doim leading slash
//   if (!s.startsWith("/")) s = `/${s}`;

//   return s;
// }

// /* ───────── FIRST CARD ───────── */
// const FirstCard = ({ product }: { product: Product }) => (
//   <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow col-span-1 sm:col-span-2">
//     <div className="p-4 text-center">
//       <h3 className="font-semibold text-gray-800">{product.title}</h3>
//       <p className="text-gray-700 text-lg font-semibold">{product.price}</p>
//     </div>
//   </div>
// );

// /* ───────── CATEGORY GRID ───────── */
// type CatCard = { id: string; title: string; image?: string };

// function CategoryGrid({ sectionId }: { sectionId: string }) {
//   const { t, lang } = useI18n() as any;
//   const [cats, setCats] = useState<CatCard[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState<string | null>(null);

//   useEffect(() => {
//     let cancelled = false;
//     (async () => {
//       setLoading(true);
//       setErr(null);
//       try {
//         const base = await fetchCategories(sectionId, lang);
//         const withImages = await Promise.all(
//           base.map(async (c: any) => {
//             let image = (c.image as string | undefined) ?? undefined;
//             if (!image) image = await getCategoryImage(sectionId, c.id);
//             return { id: c.id, title: c.title, image } as CatCard;
//           })
//         );
//         if (!cancelled) setCats(withImages);
//       } catch (e: any) {
//         if (!cancelled) setErr(e?.message || "Yuklashda xatolik.");
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     })();
//     return () => { cancelled = true; };
//   }, [sectionId]);

//   if (loading) {
//     return <div className="bg-white rounded-lg shadow p-6 text-gray-600">Yuklanmoqda…</div>;
//   }
//   if (err) {
//     return <div className="bg-white rounded-lg shadow p-6 text-red-600">{err}</div>;
//   }
//   if (cats.length === 0) {
//     return <div className="bg-white rounded-lg shadow p-6 text-gray-600">Bu bo‘limda kategoriya yo‘q.</div>;
//   }

//   // const info: Record<string, Record<string, string>> = (MAIN as any) || {};

//   const info: Record<string, Record<string, string>> = (lang === "uz" ? (MAIN_UZ as any) : (MAIN_RU as any)) || {};

//   return (
//     <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//       {cats.map((c) => {
//         const desc = info?.[sectionId]?.[c.id] || "";
//         const href = `/${sectionId}/${c.id}`;

//         return (
//           <Link href={href} key={c.id} prefetch={false} className="group">
//             <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow cursor-pointer">
//               {/* Rasm + overlay konteyneri */}
//               <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img
//                   src={c.image || "/placeholder.svg"}
//                   alt={c.title}
//                   className="w-full h-full object-cover"
//                 />

//                 {/* Overlay (hoverda chiqadi) */}
//                 {desc ? (
//                   <div className="absolute inset-0 bg-black/70 text-white translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-300 ease-out p-3 sm:p-4">
//                     <div
//                       className="text-[18px] leading-snug w-full max-h-[95%] overflow-hidden group-hover:overflow-auto pr-1 custom-scroll"
//                       style={{
//                         WebkitMaskImage:
//                           "linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0))",
//                         maskImage:
//                           "linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0))",
//                       }}
//                     >
//                       {desc}
//                     </div>
//                   </div>
//                 ) : null}
//               </div>

//               <div className="p-4 text-center">
//                 <h3 className="font-medium text-gray-800">
//                   {(() => {
//                     const key = `catalog.sections.${sectionId}.categories.${c.id}` as const;
//                     const v = t(key);
//                     return (typeof v === "string" && !v.startsWith("catalog.")) ? v : (c.title || c.id);
//                   })()}
//                 </h3>
//               </div>
//             </div>
//           </Link>
//         );
//       })}
//     </div>
//   );
// }

// /* ───────── MAIN (2 rejim) ───────── */
// const ProductList: React.FC<ProductListProps> = ({
//   mode = "products",
//   sectionId,
//   products = [],
//   size = "default",
//   type = "detailed",
// }) => {
//   const { t } = useI18n();

//   /* ===== Categories rejimi ===== */
//   if (mode === "categories") {
//     if (!sectionId) {
//       return (
//         <div className="bg-white rounded-lg shadow p-6 text-red-600">
//           sectionId kiritilmagan (mode="categories" uchun)!
//         </div>
//       );
//     }
//     return <CategoryGrid sectionId={sectionId} />;
//   }

//   /* ===== Products rejimi ===== */
//   const [cartItems, setCartItems] = useState<Record<string, number>>({});

//   useEffect(() => {
//     setCartItems(readSales());
//     const handleStorageUpdate = () => setCartItems(readSales());
//     window.addEventListener("storage", handleStorageUpdate);
//     return () => window.removeEventListener("storage", handleStorageUpdate);
//   }, []);

//   const updateCart = (
//     item: Product | string,
//     action: "add" | "increment" | "decrement"
//   ) => {
//     const sales = readSales();
//     const id = typeof item === "string" ? item : String(item.id);

//     switch (action) {
//       case "add":
//         if (!sales[id]) sales[id] = 1;
//         if (typeof item !== "string") persistCartMeta(item);
//         break;
//       case "increment":
//         if (sales[id]) sales[id] += 1;
//         break;
//       case "decrement":
//         if (sales[id] && sales[id] > 1) sales[id] -= 1;
//         else delete sales[id];
//         break;
//     }

//     writeSales(sales);
//     setCartItems(sales);
//   };

//   // Single (list) ko‘rinish
//   if (size === "single") {
//     return (
//       <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
//         {products.map((product) => {
//           const href = normalizeHref(product.slug);
//           return (
//             <Link
//               key={String(product.id)}
//               href={href}
//               prefetch={false}
//               className="flex flex-col md:flex-row items-center gap-6 border-b pb-4 last:border-b-0"
//             >
//               <div className="flex-shrink-0 w-full h-full md:w-48 md:h-48">
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img
//                   src={product.image || "/placeholder.svg"}
//                   alt={product.title}
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//               <div className="flex-1 flex flex-col justify-center text-center md:text-left">
//                 <h3 className="font-semibold text-gray-800 text-lg mb-2">
//                   {product.title}
//                 </h3>
//                 {type === "detailed" && (
//                   <>
//                     {/* <p className="text-gray-700 text-2xl font-bold mb-2">
//                       {product.price}
//                     </p> */}
//                     {product.available ? (
//                       <p className="text-green-600 text-sm mt-1">
//                         {t("productCard.in_stock")}
//                       </p>
//                     ) : (
//                       <p className="text-red-600 text-sm mt-1">
//                         {t("productCard.out_of_stock")}
//                       </p>
//                     )}
//                   </>
//                 )}
//               </div>
//               {type === "detailed" && (
//                 <div className="flex-shrink-0 mt-4 md:mt-0">
//                   {cartItems[String(product.id)] ? (
//                     <div className="flex items-center bg-red-600 rounded-md">
//                       <button
//                         className="px-4 py-2 text-white font-bold text-xl"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           updateCart(String(product.id), "decrement");
//                         }}
//                       >
//                         -
//                       </button>
//                       <span className="px-4 py-2 text-white font-bold text-xl">
//                         {cartItems[String(product.id)]}
//                       </span>
//                       <button
//                         className="px-4 py-2 text-white font-bold text-xl"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           updateCart(String(product.id), "increment");
//                         }}
//                       >
//                         +
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       className="flex items-center gap-2 px-6 py-2 rounded-md border border-orange-600 text-orange-600 font-medium hover:bg-orange-600 hover:text-white transition"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         updateCart(product, "add");
//                       }}
//                     >
//                       {t("productCard.buy")}
//                     </button>
//                   )}
//                 </div>
//               )}
//             </Link>
//           );
//         })}
//       </div>
//     );
//   }

//   // Grid ko‘rinish (products)
//   const gridClasses =
//     type === "simple" ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1 lg:grid-cols-3";
//   const showFirstCard = products[0]?.showAsFirstCard;

//   return (
//     <div className={`grid gap-12 ${gridClasses}`}>
//       {products.map((product, index) => {
//         if (index === 0 && showFirstCard) {
//           return <FirstCard key={String(product.id)} product={product} />;
//         }

//         const href = normalizeHref(product.slug);

//         return (
//           <Link href={href} key={String(product.id)} prefetch={false}>
//             <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow cursor-pointer">
//               <div className="overflow-hidden md:block py-5 px-5">
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img
//                   src={product.image || "/placeholder.svg"}
//                   alt={product.title}
//                   className="w-full h-48 object-contain rounded transition-transform duration-300"
//                 />
//               </div>
//               <div className="p-4 flex-1 flex flex-col">
//                 <h3 className="font-semibold text-gray-800 mb-2 text-center">
//                   {product.title}
//                 </h3>
//                 {type === "detailed" && (
//                   <>
//                     {/* <p className="text-gray-700 text-center text-lg font-semibold">
//                       {product.price}
//                     </p> */}
//                     {product.available ? (
//                       <p className="text-green-600 text-sm text-center mt-1">
//                         {t("productCard.in_stock")}
//                       </p>
//                     ) : (
//                       <p className="text-red-600 text-sm text-center mt-1">
//                         {t("productCard.out_of_stock")}
//                       </p>
//                     )}
//                   </>
//                 )}
//               </div>
//               {type === "detailed" && (
//                 <div className="border-t p-3 flex justify-center">
//                   {cartItems[String(product.id)] ? (
//                     <div className="flex items-center bg-red-600 rounded-md">
//                       <button
//                         className="px-4 py-2 text-white font-bold text-xl"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           updateCart(String(product.id), "decrement");
//                         }}
//                       >
//                         -
//                       </button>
//                       <span className="px-4 py-2 text-white font-bold text-xl">
//                         {cartItems[String(product.id)]}
//                       </span>
//                       <button
//                         className="px-4 py-2 text-white font-bold text-xl"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           updateCart(String(product.id), "increment");
//                         }}
//                       >
//                         +
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       className="flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700 transition"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         updateCart(product, "add");
//                       }}
//                     >
//                       {t("productCard.buy")}
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>
//           </Link>
//         );
//       })}
//     </div>
//   );
// };

// export default ProductList;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// src/components/cards/first-card.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";

// Firestore helpers
import { fetchCategories, getCategoryImage } from "@/lib/firebase/queries";
// Hover matnlar (sect -> cat -> text)
import MAIN_RU from "@/data/main.json";
import MAIN_UZ from "@/data/main.uz.json";

// ⬇️ YANGI: UI-da nomlarni avtomatik tarjima qilish uchun
import LocalizedTitle from "@/components/i18n/LocalizedTitle";

/* ───────── TYPES ───────── */
export type Product = {
  id: string | number;
  slug: string;                 // to'liq yoki nisbiy bo'lishi mumkin — normalize qilamiz
  title: string;
  price: string;
  image?: string;
  available?: boolean;
  showAsFirstCard?: boolean;
};

type ProductListProps = {
  // products rejimi uchun
  products?: Product[];
  size?: "default" | "single";
  type?: "detailed" | "simple";

  // categories rejimi uchun
  mode?: "products" | "categories";
  sectionId?: string;
};

/* ───────── Sales helpers (localStorage) ───────── */
function readSales(): Record<string, number> {
  try {
    const raw = localStorage.getItem("sales");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function writeSales(map: Record<string, number>) {
  localStorage.setItem("sales", JSON.stringify(map));
  window.dispatchEvent(new Event("storage"));
}
function persistCartMeta(p: Product) {
  try {
    const raw = localStorage.getItem("sales_meta");
    const meta = raw ? JSON.parse(raw) : {};
    const id = String(p.id);
    meta[id] = {
      title: p.title,
      price: p.price,
      image: p.image || meta[id]?.image || "",
    };
    localStorage.setItem("sales_meta", JSON.stringify(meta));
    window.dispatchEvent(new Event("storage"));
  } catch { /* ignore */ }
}

/* ───────── URL normalizatsiya ───────── */
function normalizeHref(slug?: string) {
  if (!slug) return "#";
  let s = slug.trim();

  // Eski yo'llar: product/ prefiksini tashlaymiz
  s = s.replace(/^product\//i, "");

  // Agar tashqi URL bermagan bo‘lsangiz, har doim leading slash
  if (!s.startsWith("/")) s = `/${s}`;

  return s;
}

/* ───────── FIRST CARD ───────── */
const FirstCard = ({ product }: { product: Product }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow col-span-1 sm:col-span-2">
    <div className="p-4 text-center">
      <h3 className="font-semibold text-gray-800">
        {/* ⬇️ YANGI */}
        <LocalizedTitle text={product.title} />
      </h3>
      <p className="text-gray-700 text-lg font-semibold">{product.price}</p>
    </div>
  </div>
);

/* ───────── CATEGORY GRID ───────── */
type CatCard = { id: string; title: string; image?: string };

function CategoryGrid({ sectionId }: { sectionId: string }) {
  const { t, lang } = useI18n() as any;
  const [cats, setCats] = useState<CatCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const base = await fetchCategories(sectionId, lang);
        const withImages = await Promise.all(
          base.map(async (c: any) => {
            let image = (c.image as string | undefined) ?? undefined;
            if (!image) image = await getCategoryImage(sectionId, c.id);
            return { id: c.id, title: c.title, image } as CatCard;
          })
        );
        if (!cancelled) setCats(withImages);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message || "Yuklashda xatolik.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [sectionId, lang]); // ⬅️ lang ham qo'shildi

  if (loading) {
    return <div className="bg-white rounded-lg shadow p-6 text-gray-600">Yuklanmoqda…</div>;
  }
  if (err) {
    return <div className="bg-white rounded-lg shadow p-6 text-red-600">{err}</div>;
  }
  if (cats.length === 0) {
    return <div className="bg-white rounded-lg shadow p-6 text-gray-600">Bu bo‘limda kategoriya yo‘q.</div>;
  }

  const info: Record<string, Record<string, string>> = (lang === "uz" ? (MAIN_UZ as any) : (MAIN_RU as any)) || {};

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {cats.map((c) => {
        const desc = info?.[sectionId]?.[c.id] || "";
        const href = `/${sectionId}/${c.id}`;

        // i18n t() orqali chiqqan qiymat yoki Firestore'dan kelgan title
        const rawLabel = (() => {
          const key = `catalog.sections.${sectionId}.categories.${c.id}` as const;
          const v = t(key);
          return (typeof v === "string" && !v.startsWith("catalog.")) ? v : (c.title || c.id);
        })();

        return (
          <Link href={href} key={c.id} prefetch={false} className="group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow cursor-pointer">
              {/* Rasm + overlay konteyneri */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image || "/placeholder.svg"}
                  alt={rawLabel}
                  className="w-full h-full object-cover"
                />

                {/* Overlay (hoverda chiqadi) */}
                {desc ? (
                  <div className="absolute inset-0 bg-black/70 text-white translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-300 ease-out p-3 sm:p-4">
                    <div
                      className="text-[18px] leading-snug w-full max-h-[95%] overflow-hidden group-hover:overflow-auto pr-1 custom-scroll"
                      style={{
                        WebkitMaskImage:
                          "linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0))",
                        maskImage:
                          "linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0))",
                      }}
                    >
                      {desc}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="p-4 text-center">
                <h3 className="font-medium text-gray-800">
                  {/* ⬇️ YANGI: label'ni UI-da tarjima qilamiz */}
                  <LocalizedTitle text={rawLabel} />
                </h3>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

/* ───────── MAIN (2 rejim) ───────── */
const ProductList: React.FC<ProductListProps> = ({
  mode = "products",
  sectionId,
  products = [],
  size = "default",
  type = "detailed",
}) => {
  const { t } = useI18n();

  /* ===== Categories rejimi ===== */
  if (mode === "categories") {
    if (!sectionId) {
      return (
        <div className="bg-white rounded-lg shadow p-6 text-red-600">
          sectionId kiritilmagan (mode="categories" uchun)!
        </div>
      );
    }
    return <CategoryGrid sectionId={sectionId} />;
  }

  /* ===== Products rejimi ===== */
  const [cartItems, setCartItems] = useState<Record<string, number>>({});

  useEffect(() => {
    setCartItems(readSales());
    const handleStorageUpdate = () => setCartItems(readSales());
    window.addEventListener("storage", handleStorageUpdate);
    return () => window.removeEventListener("storage", handleStorageUpdate);
  }, []);

  const updateCart = (
    item: Product | string,
    action: "add" | "increment" | "decrement"
  ) => {
    const sales = readSales();
    const id = typeof item === "string" ? item : String(item.id);

    switch (action) {
      case "add":
        if (!sales[id]) sales[id] = 1;
        if (typeof item !== "string") persistCartMeta(item);
        break;
      case "increment":
        if (sales[id]) sales[id] += 1;
        break;
      case "decrement":
        if (sales[id] && sales[id] > 1) sales[id] -= 1;
        else delete sales[id];
        break;
    }

    writeSales(sales);
    setCartItems(sales);
  };

  // Single (list) ko‘rinish
  if (size === "single") {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {products.map((product) => {
          const href = normalizeHref(product.slug);
          return (
            <Link
              key={String(product.id)}
              href={href}
              prefetch={false}
              className="flex flex-col md:flex-row items-center gap-6 border-b pb-4 last:border-b-0"
            >
              <div className="flex-shrink-0 w-full h-full md:w-48 md:h-48">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                <h3 className="font-semibold text-gray-800 text-lg mb-2">
                  {/* ⬇️ YANGI */}
                  <LocalizedTitle text={product.title} />
                </h3>
                {type === "detailed" && (
                  <>
                    {/* <p className="text-gray-700 text-2xl font-bold mb-2">
                      {product.price}
                    </p> */}
                    {product.available ? (
                      <p className="text-green-600 text-sm mt-1">
                        {t("productCard.in_stock")}
                      </p>
                    ) : (
                      <p className="text-red-600 text-sm mt-1">
                        {t("productCard.out_of_stock")}
                      </p>
                    )}
                  </>
                )}
              </div>
              {type === "detailed" && (
                <div className="flex-shrink-0 mt-4 md:mt-0">
                  {cartItems[String(product.id)] ? (
                    <div className="flex items-center bg-red-600 rounded-md">
                      <button
                        className="px-4 py-2 text-white font-bold text-xl"
                        onClick={(e) => {
                          e.preventDefault();
                          updateCart(String(product.id), "decrement");
                        }}
                      >
                        -
                      </button>
                      <span className="px-4 py-2 text-white font-bold text-xl">
                        {cartItems[String(product.id)]}
                      </span>
                      <button
                        className="px-4 py-2 text-white font-bold text-xl"
                        onClick={(e) => {
                          e.preventDefault();
                          updateCart(String(product.id), "increment");
                        }}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="flex items-center gap-2 px-6 py-2 rounded-md border border-orange-600 text-orange-600 font-medium hover:bg-orange-600 hover:text-white transition"
                      onClick={(e) => {
                        e.preventDefault();
                        updateCart(product, "add");
                      }}
                    >
                      {t("productCard.buy")}
                    </button>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    );
  }

  // Grid ko‘rinish (products)
  const gridClasses =
    type === "simple" ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1 lg:grid-cols-3";
  const showFirstCard = products[0]?.showAsFirstCard;

  return (
    <div className={`grid gap-12 ${gridClasses}`}>
      {products.map((product, index) => {
        if (index === 0 && showFirstCard) {
          return <FirstCard key={String(product.id)} product={product} />;
        }

        const href = normalizeHref(product.slug);

        return (
          <Link href={href} key={String(product.id)} prefetch={false}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow cursor-pointer">
              <div className="overflow-hidden md:block py-5 px-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-48 object-contain rounded transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-gray-800 mb-2 text-center">
                  {/* ⬇️ YANGI */}
                  <LocalizedTitle text={product.title} />
                </h3>
                {type === "detailed" && (
                  <>
                    {/* <p className="text-gray-700 text-center text-lg font-semibold">
                      {product.price}
                    </p> */}
                    {product.available ? (
                      <p className="text-green-600 text-sm text-center mt-1">
                        {t("productCard.in_stock")}
                      </p>
                    ) : (
                      <p className="text-red-600 text-sm text-center mt-1">
                        {t("productCard.out_of_stock")}
                      </p>
                    )}
                  </>
                )}
              </div>
              {type === "detailed" && (
                <div className="border-t p-3 flex justify-center">
                  {cartItems[String(product.id)] ? (
                    <div className="flex items-center bg-red-600 rounded-md">
                      <button
                        className="px-4 py-2 text-white font-bold text-xl"
                        onClick={(e) => {
                          e.preventDefault();
                          updateCart(String(product.id), "decrement");
                        }}
                      >
                        -
                      </button>
                      <span className="px-4 py-2 text-white font-bold text-xl">
                        {cartItems[String(product.id)]}
                      </span>
                      <button
                        className="px-4 py-2 text-white font-bold text-xl"
                        onClick={(e) => {
                          e.preventDefault();
                          updateCart(String(product.id), "increment");
                        }}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700 transition"
                      onClick={(e) => {
                        e.preventDefault();
                        updateCart(product, "add");
                      }}
                    >
                      {t("productCard.buy")}
                    </button>
                  )}
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductList;
