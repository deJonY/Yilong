"use client";

import { useEffect, useMemo, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/init";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/components/i18n/I18nProvider";
import ZoomImage from "./ZoomImage";
import Link from "next/link";
import ProductList from "../cards/first-card";

type Props = {
  sectionId: string;
  categoryId: string;
  itemId: string;
  sizeId?: string;
};

export default function ProductPageClient({ sectionId, categoryId, itemId, sizeId }: Props) {
  const { t } = useI18n();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any | null>(null);
  const [sectionTitle, setSectionTitle] = useState<string>(sectionId);
  const [categoryTitle, setCategoryTitle] = useState<string>(categoryId);
  const [sizeLabel, setSizeLabel] = useState<string | null>(null);

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
  // data: Firestore’dan yuklangan mahsulot obyekt (title/price/image bo‘ladi)
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

  const crumbs = [
    { label: t("breadcrumbs.catalog"), href: "/" },
    { label: sectionTitle, href: `/${sectionId}` },
    { label: categoryTitle, href: `/${sectionId}/${categoryId}` },
  ] as {label: string; href?: string}[];

  if (sizeId && sizeLabel) {
    crumbs.push({ label: sizeLabel, href: `/${sectionId}/${categoryId}?size=${sizeId}` });
  }
  if (data?.title) crumbs.push({ label: data.title });

  const products = useMemo(() => {
    if (!data) return [];
    return [data];
  }, [data]);

  const layout = useMemo(() => {
    if (!data) return "grid";
    return "detailed";
  }, [data]);
  
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {/* <img
                src={data.image || "/placeholder.svg"}
                alt={data.title}
                className="w-full h-80 object-contain"
              /> */}
              <ZoomImage
                src={data?.image || "/placeholder.svg"}
                alt={data?.title || ""}
                scale={2}
                containerClassName="w-full md:w-full md:h-[380px] bg-white rounded-lg overflow-hidden"
              />
            </div>
            <div className="p-4 space-y-3">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{data.title}</h1>
              {/* <p className="text-xl font-semibold text-slate-800">{data.price}</p> */}
              <p className={`text-sm ${data.available ? "text-green-600" : "text-red-600"}`}>
                {data.available ? t("productDetail.in_stock") : t("productDetail.out_of_stock")}
              </p>
              {data.description && (
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {data.description}
                </p>
              )}
              {/* <div>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-md font-medium">
                  {t("product.buy")}
                </button>
              </div> */}
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
                <Link href="/tovary-i-uslugi" className="px-6 py-3 border border-orange-600 text-orange-600 rounded-md hover:bg-orange-600 hover:text-white font-medium"
                >
                  {t("product.more")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <ProductList products={products} type="detailed" size={layout === "grid" ? "default" : "single"} />
    </section>
  );
}
