// "use client";

// import { useState, useEffect } from "react";
// import type { Product } from "@/types/product";

// /* sales_meta ga meta yozuvchi helper */
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
//   } catch {}
// }

// export default function ProductClient({ product }: { product: Product }) {
//   const [position, setPosition] = useState({ x: "50%", y: "50%" });
//   const [quantity, setQuantity] = useState<number>(0);

//   const updateCart = (action: "add" | "increment" | "decrement") => {
//     const raw = localStorage.getItem("sales");
//     const sales = raw ? JSON.parse(raw) : {};
//     const id = String(product.id);

//     if (action === "add") {
//       if (!sales[id]) sales[id] = 1;
//       // 👉 meta’ni shu yerda yozamiz
//       persistCartMeta(product);
//     } else if (action === "increment") {
//       if (sales[id]) sales[id] += 1;
//     } else if (action === "decrement") {
//       if (sales[id] && sales[id] > 1) sales[id] -= 1;
//       else delete sales[id];
//     }

//     localStorage.setItem("sales", JSON.stringify(sales));
//     setQuantity(sales[id] || 0);
//     window.dispatchEvent(new Event("storage"));
//   };

//   useEffect(() => {
//     const sales = localStorage.getItem("sales") ? JSON.parse(localStorage.getItem("sales") as string) : {};
//     setQuantity(sales[String(product.id)] || 0);

//     const handle = () => {
//       const s = localStorage.getItem("sales") ? JSON.parse(localStorage.getItem("sales") as string) : {};
//       setQuantity(s[String(product.id)] || 0);
//     };
//     window.addEventListener("storage", handle);
//     return () => window.removeEventListener("storage", handle);
//   }, [product.id]);

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const { left, width, top, height } = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setPosition({ x: `${x}%`, y: `${y}%` });
//   };

//   return (
//     <div className="container mx-auto p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
//       <div className="flex justify-center items-center overflow-hidden py-5 px-5" onMouseMove={handleMouseMove}>
//         <img
//           src={product.image || "/placeholder.svg"}
//           alt={product.title}
//           style={{ transformOrigin: `${position.x} ${position.y}` }}
//           className="w-auto h-full object-contain rounded transition-transform duration-300 hover:scale-[2]"
//         />
//       </div>

//       <div className="flex flex-col justify-between">
//         <div>
//           <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
//           <p className="text-2xl text-orange-600 font-semibold mb-2">{product.price}</p>
//           {product.available ? (
//             <p className="text-green-600 mb-4">В наличии</p>
//           ) : (
//             <p className="text-red-600 mb-4">Нет в наличии</p>
//           )}

//           {quantity > 0 ? (
//             <div className="flex items-center gap-2">
//               <button className="px-4 py-2 bg-red-600 text-white font-bold rounded-md" onClick={() => updateCart("decrement")}>-</button>
//               <span className="px-3 py-2 border rounded-md">{quantity}</span>
//               <button className="px-4 py-2 bg-red-600 text-white font-bold rounded-md" onClick={() => updateCart("increment")}>+</button>
//             </div>
//           ) : (
//             <button
//               className="bg-orange-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-orange-700 transition cursor-pointer"
//               onClick={() => updateCart("add")}
//             >
//               Купить
//             </button>
//           )}
//         </div>

//         <div className="mt-6 text-gray-600">
//           <h2 className="font-semibold text-lg mb-2">Описание товара</h2>
//           <p>{product.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// "use client";

// import { useState, useEffect } from "react";
// import type { Product } from "@/types/product";
// import { useI18n } from "@/components/i18n/I18nProvider";

// /* sales_meta ga meta yozuvchi helper */
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
//   } catch {}
// }

// export default function ProductClient({ product }: { product: Product }) {
//   const { t } = useI18n();
//   const [position, setPosition] = useState({ x: "50%", y: "50%" });
//   const [quantity, setQuantity] = useState<number>(0);

//   const updateCart = (action: "add" | "increment" | "decrement") => {
//     const raw = localStorage.getItem("sales");
//     const sales = raw ? JSON.parse(raw) : {};
//     const id = String(product.id);

//     if (action === "add") {
//       if (!sales[id]) sales[id] = 1;
//       persistCartMeta(product);
//     } else if (action === "increment") {
//       if (sales[id]) sales[id] += 1;
//     } else if (action === "decrement") {
//       if (sales[id] && sales[id] > 1) sales[id] -= 1;
//       else delete sales[id];
//     }

//     localStorage.setItem("sales", JSON.stringify(sales));
//     setQuantity(sales[id] || 0);
//     window.dispatchEvent(new Event("storage"));
//   };

//   useEffect(() => {
//     const sales = localStorage.getItem("sales") ? JSON.parse(localStorage.getItem("sales") as string) : {};
//     setQuantity(sales[String(product.id)] || 0);

//     const handle = () => {
//       const s = localStorage.getItem("sales") ? JSON.parse(localStorage.getItem("sales") as string) : {};
//       setQuantity(s[String(product.id)] || 0);
//     };
//     window.addEventListener("storage", handle);
//     return () => window.removeEventListener("storage", handle);
//   }, [product.id]);

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const { left, width, top, height } = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setPosition({ x: `${x}%`, y: `${y}%` });
//   };

//   return (
//     <div className="container mx-auto p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
//       <div className="flex justify-center items-center overflow-hidden py-5 px-5" onMouseMove={handleMouseMove}>
//         <img
//           src={product.image || "/placeholder.svg"}
//           alt={product.title}
//           style={{ transformOrigin: `${position.x} ${position.y}` }}
//           className="w-auto h-full object-contain rounded transition-transform duration-300 hover:scale-[2]"
//         />
//       </div>

//       <div className="flex flex-col justify-between">
//         <div>
//           <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
//           <p className="text-2xl text-orange-600 font-semibold mb-2">{product.price}</p>
//           {product.available ? (
//             <p className="text-green-600 mb-4">{t("productDetail.in_stock")}</p>
//           ) : (
//             <p className="text-red-600 mb-4">{t("productDetail.out_of_stock")}</p>
//           )}

//           {quantity > 0 ? (
//             <div className="flex items-center gap-2">
//               <button
//                 className="px-4 py-2 bg-red-600 text-white font-bold rounded-md"
//                 onClick={() => updateCart("decrement")}
//                 aria-label={t("productDetail.decrease")}
//               >
//                 -
//               </button>
//               <span className="px-3 py-2 border rounded-md" aria-live="polite">{quantity}</span>
//               <button
//                 className="px-4 py-2 bg-red-600 text-white font-bold rounded-md"
//                 onClick={() => updateCart("increment")}
//                 aria-label={t("productDetail.increase")}
//               >
//                 +
//               </button>
//             </div>
//           ) : (
//             <button
//               className="bg-orange-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-orange-700 transition cursor-pointer"
//               onClick={() => updateCart("add")}
//               aria-label={t("productDetail.buy")}
//             >
//               {t("productDetail.buy")}
//             </button>
//           )}
//         </div>

//         <div className="mt-6 text-gray-600">
//           <h2 className="font-semibold text-lg mb-2">{t("productDetail.description_title")}</h2>
//           <p>{product.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// components/product/ProductPageClient.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/init";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/components/i18n/I18nProvider";
import Link from "next/link";


// ⬇️ YANGI: UI’da nomlarni avtomatik tarjima qilish (ReactNode)
import LocalizedTitle from "@/components/i18n/LocalizedTitle";
// ⬇️ YANGI: faqat string kerak bo‘ladigan joylar uchun (alt, breadcrumbs)
import { translateProductTitle } from "@/lib/titleTranslate";
import ProductList from "@/components/cards/first-card";
import ZoomImage from "@/components/product/ZoomImage";

type Props = {
  sectionId: string;
  categoryId: string;
  itemId: string;
  sizeId?: string;
};

export default function ProductPageClient({ sectionId, categoryId, itemId, sizeId }: Props) {
  const { t, lang } = useI18n() as any; // lang: "uz" | "ru"
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any | null>(null);
  const [sectionTitle, setSectionTitle] = useState<string>(sectionId);
  const [categoryTitle, setCategoryTitle] = useState<string>(categoryId);
  const [sizeLabel, setSizeLabel] = useState<string | null>(null);

  // Yordamchi: stringni locale bo‘yicha tarjima
  const tr = (s?: string | null) => translateProductTitle(s || "", lang);

  // Cart helpers (ProductList bilan mos)
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
  function persistCartMeta(item: { id: string; title?: string; price?: string; image?: string; slug?: string }) {
    try {
      const raw = localStorage.getItem("sales_meta");
      const meta = raw ? JSON.parse(raw) : {};
      meta[String(item.id)] = {
        title: item.title || "",
        price: item.price || "",
        image: item.image || "",
        slug: item.slug || "",
        ts: Date.now(),
      };
      localStorage.setItem("sales_meta", JSON.stringify(meta));
    } catch {}
  }

  const [qty, setQty] = useState<number>(0);

  function currentId() { return String(itemId); }
  function currentSlug() {
    return sizeId
      ? `/${sectionId}/${categoryId}/sizes/${sizeId}/${itemId}`
      : `/${sectionId}/${categoryId}/${itemId}`;
  }

  function syncQty() {
    const sales = readSales();
    setQty(sales[currentId()] || 0);
  }

  function addToCart() {
    const sales = readSales();
    if (!sales[currentId()]) sales[currentId()] = 1;
    writeSales(sales);
    // meta RU bo‘lishi ham mumkin — bu yerda UI uchun emas, storaj uchun
    persistCartMeta({ id: currentId(), title: data?.title, price: data?.price, image: data?.image, slug: currentSlug() });
    setQty(sales[currentId()]);
  }
  function inc() {
    const sales = readSales();
    sales[currentId()] = (sales[currentId()] || 0) + 1;
    writeSales(sales);
    setQty(sales[currentId()]);
  }
  function dec() {
    const sales = readSales();
    if (!sales[currentId()]) return;
    sales[currentId()] = Math.max(0, (sales[currentId()] || 0) - 1);
    if (sales[currentId()] === 0) delete sales[currentId()];
    writeSales(sales);
    setQty(sales[currentId()] || 0);
  }

  useEffect(() => {
    const h = () => syncQty();
    window.addEventListener("storage", h);
    syncQty();
    return () => window.removeEventListener("storage", h);
  }, [sectionId, categoryId, sizeId, itemId]);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        // titles
        const secSnap = await getDoc(doc(db, "products", sectionId));
        const catSnap = await getDoc(doc(db, "products", sectionId, "categories", categoryId));
        if (alive) {
          setSectionTitle((secSnap.data()?.title as string) || sectionId);
          setCategoryTitle((catSnap.data()?.title as string) || categoryId);
        }

        if (sizeId) {
          const szSnap = await getDoc(doc(db, "products", sectionId, "categories", categoryId, "sizes", sizeId));
          const z = szSnap.data() as any | undefined;
          if (alive) setSizeLabel(z ? `${z.name} (${z.size})` : null);
          const itemSnap = await getDoc(doc(db, "products", sectionId, "categories", categoryId, "sizes", sizeId, "items", itemId));
          if (alive) setData(itemSnap.data() || null);
        } else {
          const itemSnap = await getDoc(doc(db, "products", sectionId, "categories", categoryId, "items", itemId));
          if (alive) setData(itemSnap.data() || null);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [sectionId, categoryId, itemId, sizeId]);

  // ⬇️ Breadcrumbs uchun label’larni string holatda tarjima qilib uzatamiz
  const crumbs = [
    { label: t("breadcrumbs.catalog"), href: "/" },
    { label: tr(sectionTitle), href: `/${sectionId}` },
    { label: tr(categoryTitle), href: `/${sectionId}/${categoryId}` },
  ] as {label: string; href?: string}[];

  if (sizeId && sizeLabel) {
    crumbs.push({ label: tr(sizeLabel), href: `/${sectionId}/${categoryId}?size=${sizeId}` });
  }
  if (data?.title) crumbs.push({ label: tr(data.title) });

  const products = useMemo(() => {
    if (!data) return [];
    return [data];
  }, [data]);

  const layout = useMemo(() => {
    if (!data) return "grid";
    return "detailed";
  }, [data]);

  // ⬇️ alt uchun ham string bo‘lishi kerak:
  const imageAlt = tr(data?.title || "");

  return (
    <section className="space-y-4">
      <Breadcrumbs items={crumbs} />

      {loading ? (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-64 w-full" />
            <div className="space-y-3">
              <Skeleton className="h-7 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-9 w-40" />
            </div>
          </div>
        </div>
      ) : !data ? (
        <div className="bg-white rounded-lg shadow p-6 text-red-600">
          {t("product.not_found")}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-0">
              <ZoomImage
                src={data?.image || "/placeholder.svg"}
                alt={imageAlt}
                scale={2}
                containerClassName="w-full md:w-full md:h-[380px] bg-white rounded-lg overflow-hidden"
              />
            </div>
            <div className="p-4 space-y-3">
              {/* ⬇️ H1 ko‘rinishida ReactNode tarzida tarjima */}
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                <LocalizedTitle text={data.title} />
              </h1>

              <p className={`text-sm ${data.available ? "text-green-600" : "text-red-600"}`}>
                {data.available ? t("productDetail.in_stock") : t("productDetail.out_of_stock")}
              </p>

              {data.description && (
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {data.description}
                </p>
              )}

              <div className="flex items-center gap-3">
                {qty > 0 ? (
                  <div className="flex items-center bg-red-600 rounded-md">
                    <button className="px-4 py-2 text-white font-bold text-xl" onClick={dec}>-</button>
                    <span className="px-4 py-2 text-white font-bold text-xl">{qty}</span>
                    <button className="px-4 py-2 text-white font-bold text-xl" onClick={inc}>+</button>
                  </div>
                ) : (
                  <button
                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-md font-medium"
                    onClick={addToCart}
                  >
                    {t("product.buy")}
                  </button>
                )}

                {/* MORE → /tovary-i-uslugi */}
                <Link
                  href="/tovary-i-uslugi"
                  className="px-6 py-3 border border-orange-600 text-orange-600 rounded-md hover:bg-orange-600 hover:text-white font-medium"
                >
                  {t("product.more")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pastda related/single ko‘rinish — ProductList ichida ham LocalizedTitle ishlaydi */}
      <ProductList products={products} type="detailed" size={layout === "grid" ? "default" : "single"} />
    </section>
  );
}
