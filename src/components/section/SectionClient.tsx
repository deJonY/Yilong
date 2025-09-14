// src/components/section/SectionClient.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchCategories,
  fetchSizes,
  fetchItemsSize,
  fetchItemsCat,
} from "@/lib/firebase/queries";
import ProductList from "@/components/cards/first-card";
import { LayoutGrid, List } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";

/* ---------- Types ---------- */
type Category = { id: string; title: string; image?: string };
type FBItem = {
  id: string;
  title: string;
  price: string;
  image?: string;
  available?: boolean;
  _categoryId?: string; // biz qo‘shamiz
  _sizeId?: string;     // biz qo‘shamiz (size rejimi uchun)
};
type UiItem = {
  id: string;
  slug: string;   // to‘liq URL
  title: string;
  price: string;
  image?: string;
  available?: boolean;
};

/* ---------- Utils ---------- */
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* =================================================================== */
export default function SectionClient({ sectionId }: { sectionId: string }) {
  const router = useRouter();
  const { t } = useI18n();

  /* --- Kategoriyalar --- */
  const [categories, setCategories] = useState<Category[]>([]);
  const [catsLoading, setCatsLoading] = useState(true);

  /* --- Tovarlar (butun bo‘lim bo‘yicha) --- */
  const [items, setItems] = useState<FBItem[]>([]);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  /* --- Toolbar --- */
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [pageSize, setPageSize] = useState<number>(12);

  /* ------------ Kategoriyalarni yuklash ------------ */
  useEffect(() => {
    let alive = true;
    (async () => {
      setCatsLoading(true);
      try {
        const cats = await fetchCategories(sectionId);
        if (!alive) return;
        setCategories(cats);
      } catch (e) {
        console.error("[Section] categories error:", e);
      } finally {
        if (alive) setCatsLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [sectionId]);

  /* ------------ Barcha tovarlarni (random) yuklash ------------ */
  useEffect(() => {
    let alive = true;
    (async () => {
      setItemsLoading(true);
      setErr(null);
      try {
        const cats = await fetchCategories(sectionId);

        const perCat = await Promise.all(
          cats.map(async (c) => {
            const sizes = await fetchSizes(sectionId, c.id);
            if (sizes.length > 0) {
              const chunk = await Promise.all(
                sizes.map(async (sz) => {
                  const list = await fetchItemsSize(sectionId, c.id, sz.id);
                  return list.map((it) => ({
                    ...it,
                    _categoryId: c.id,
                    _sizeId: sz.id,
                  })) as FBItem[];
                })
              );
              return chunk.flat();
            } else {
              const list = await fetchItemsCat(sectionId, c.id);
              return list.map((it) => ({ ...it, _categoryId: c.id })) as FBItem[];
            }
          })
        );

        const flat = shuffle(perCat.flat());
        if (!alive) return;
        setItems(flat);
      } catch (e: any) {
        console.error("[Section] items error:", e);
        if (alive) setErr(e?.message || "Yuklashda xatolik");
      } finally {
        if (alive) setItemsLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [sectionId]);

  /* ------------ URL’lar uchun transform ------------ */
  const uiProducts: UiItem[] = useMemo(() => {
    return items.map((it) => {
      const base = `/${sectionId}/${it._categoryId}`;
      const slug = it._sizeId
        ? `${base}/sizes/${it._sizeId}/${it.id}`
        : `${base}/${it.id}`;
      return {
        id: it.id,
        slug,
        title: it.title,
        price: it.price,
        image: it.image,
        available: it.available ?? true,
      };
    });
  }, [items, sectionId]);

  const visible = useMemo(() => uiProducts.slice(0, pageSize), [uiProducts, pageSize]);

  /* ------------ Actions ------------ */
  const openCategory = (catId: string) => router.push(`/${sectionId}/${catId}`);

  /* =================================================================== */
  return (
    <div className="space-y-10">
      {/* 1) Kategoriyalar grid (avvalgi eski holat) */}
      <div className="space-y-4">
        {/* <h2 className="text-2xl md:text-3xl font-bold">{t("sections.title") ?? "Листовые материалы"}</h2> */}

        {catsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-40 bg-white rounded-lg shadow animate-pulse" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-gray-600">{t("sections.empty")}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => openCategory(cat.id)}
                className="text-left bg-white rounded-lg shadow hover:shadow-lg transition p-4"
              >
                {cat.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    loading="lazy"
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}
                <h3 className="text-lg font-semibold text-gray-800">{cat.title}</h3>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2) Bo‘limdagi barcha tovarlar (random) + toolbar */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{t("category.products.heading_plain")}</h3>

        {/* Toolbar */}
        {!itemsLoading && uiProducts.length > 0 && (
          <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="text-sm text-slate-700">{t("category.per_page_label")}</label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="px-2 py-1 rounded bg-slate-200 text-slate-800"
              >
                {[12, 24, 36, 48].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
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
        )}

        {/* Products */}
        {itemsLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-white rounded-lg shadow animate-pulse" />
            ))}
          </div>
        ) : err ? (
          <div className="bg-white rounded-lg shadow p-6 text-red-600">{err}</div>
        ) : uiProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-gray-600">
            {t("category.products.empty")}
          </div>
        ) : layout === "grid" ? (
          <ProductList products={visible} type="detailed" size="default" />
        ) : (
          <ProductList products={visible} type="detailed" size="single" />
        )}
      </div>
    </div>
  );
}
